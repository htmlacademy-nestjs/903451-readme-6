import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRole } from '@project/shared/core';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ChangeUserPasswordDto } from '../dto/change-user-password.dto';

const AUTH_USER_EXISTS = 'User with this email exists';
const AUTH_USER_IS_NOT_REGISTERED = 'User with this email is not registered';
const AUTH_USER_PASSWORD_IS_NOT_CORRECT = 'User password is not correct';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, firstname, lastname, password, dateBirth } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const blogUser = {
      id: randomUUID(),
      email,
      firstname,
      lastname,
      role: UserRole.User,
      dateOfBirth: dayjs(dateBirth).toDate(),
      passwordHash: '',
    };

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<BlogUserEntity> {
    const { email, password } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_IS_NOT_REGISTERED);
    }

    const isPasswordCorrect = await existUser.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_IS_NOT_CORRECT);
    }

    return existUser;
  }
  public async changePassword(
    id: string,
    dto: ChangeUserPasswordDto
  ): Promise<BlogUserEntity> {
    const { currentPassword, newPassword } = dto;

    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_IS_NOT_REGISTERED);
    }

    if (!existUser.comparePassword(currentPassword)) {
      throw new BadRequestException(AUTH_USER_PASSWORD_IS_NOT_CORRECT);
    }

    const userWithNewPassword = await new BlogUserEntity(existUser).setPassword(
      newPassword
    );

    this.blogUserRepository.save(userWithNewPassword);

    return userWithNewPassword;
  }

  public async getUser(id: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_IS_NOT_REGISTERED);
    }

    return user;
  }
}
