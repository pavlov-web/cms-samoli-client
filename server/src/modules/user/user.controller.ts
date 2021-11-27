import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { IUserResponse } from './types';
import { UserRole } from '../../types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './decorators/user.decorator';
import { Auth } from './decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateUserDto): Promise<IUserResponse> {
    const user = await this.userService.create(dto);
    return this.userService.buldUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userService.login(dto);
    return this.userService.buldUserResponse(user);
  }

  @Get('current')
  async currentUser(@User() user: UserEntity) {
    return this.userService.buldUserResponse(user);
  }

  @Put('update')
  @Auth(UserRole.ADMIN)
  async updateUser(@User('id') id: number, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
