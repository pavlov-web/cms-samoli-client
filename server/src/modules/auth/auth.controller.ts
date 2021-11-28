import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
