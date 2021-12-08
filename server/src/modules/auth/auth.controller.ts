import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() dto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, ...user } = await this.authService.login(dto);
    response.cookie('token', token, { httpOnly: true });
    return user;
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
