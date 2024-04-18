import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@project/shared/core';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ChangeUserPasswordDto } from '../dto/change-user-password.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';

const AuthenticationResponses = {
  UserCreated: 'User has successfully been created',
  UserExist: 'User with the email already exist',
  UserLoggedIn: 'User has successfully logged in',
  UserNotExist: 'User with the email is not exist',
  UserUnauthorized: 'User password is not correct',
  UserPasswordChanged: 'User password has successfully been changed',
  UserPasswordIncorrect: 'User password is not correct',
} as const;

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponses.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponses.UserExist,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto): Promise<AuthUser> {
    const newUser = await this.authService.register(dto);
    return newUser.toPOJO();
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponses.UserLoggedIn,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponses.UserNotExist,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponses.UserUnauthorized,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto): Promise<AuthUser> {
    const user = await this.authService.verifyUser(dto);

    return user.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponses.UserPasswordChanged,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponses.UserNotExist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: AuthenticationResponses.UserPasswordIncorrect,
  })
  @HttpCode(HttpStatus.OK)
  @Post(':id/change-password')
  public async changePassword(
    @Param('id') id: string,
    @Body() dto: ChangeUserPasswordDto
  ): Promise<AuthUser> {
    const user = await this.authService.changePassword(id, dto);

    return user.toPOJO();
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponses.UserLoggedIn,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponses.UserNotExist,
  })
  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<AuthUser> {
    const user = await this.authService.getUser(id);

    return user.toPOJO();
  }
}
