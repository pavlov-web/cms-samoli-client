import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { IUserResponse } from './types';
import { Request } from 'express';
import { ExpressRequestInterface } from 'src/types';
import { User } from '../decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateUserDto): Promise<IUserResponse> {
    const user = await this.userService.create(dto)
    return this.userService.buldUserResponse(user)
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userService.login(dto)
    return this.userService.buldUserResponse(user)
  }

  @Get('current')
  async currentUser(@User() user: UserEntity) {
    return this.userService.buldUserResponse(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
