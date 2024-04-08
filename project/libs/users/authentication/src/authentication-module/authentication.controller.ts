import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthUser } from '@project/shared/core';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ChangeUserPasswordDto } from '../dto/change-user-password.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto): Promise<AuthUser> {
    const newUser = await this.authService.register(dto);
    return newUser.toPOJO();
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto): Promise<AuthUser> {
    const user = await this.authService.verifyUser(dto);

    return user.toPOJO();
  }

  @Post(':id/change-password')
  public async changePassword(
    @Param('id') id: string,
    @Body() dto: ChangeUserPasswordDto
  ): Promise<AuthUser> {
    const user = await this.authService.changePassword(id, dto);

    return user.toPOJO();
  }

  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<AuthUser> {
    const user = await this.authService.getUser(id);

    return user.toPOJO();
  }
}
