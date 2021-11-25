import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { IUserResponse } from './types';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor( @InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  async create(dto: CreateUserDto) {
    const isUser = await this.repository.findOne({email: dto.email});
    if(isUser) throw new HttpException('Email уже зарегистрирован', HttpStatus.UNPROCESSABLE_ENTITY);

    const user = Object.assign(new UserEntity(), dto);
    return this.repository.save(user);
  }

  async login(dto: LoginUserDto) {
    const user = await this.repository.findOne({ email: dto.email },{
      select: ['id','firstName','lastName','position','email','password','createAt','updateAt']
    });
    if(!user) throw new HttpException('Неверный Email', HttpStatus.UNPROCESSABLE_ENTITY);

    const isPasswordCorrect = await compare(dto.password, user.password)
    if(!isPasswordCorrect) throw new HttpException('Неверный пароль', HttpStatus.UNPROCESSABLE_ENTITY);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await this.repository.findOne(id)
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOne(id);
    Object.assign(user, dto)
    return this.repository.save(user)
  }

  async findAll() {
    return await this.repository.find();
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }

  buldUserResponse(user: UserEntity): IUserResponse {
    return {
      ...user,
      token: this.generateJwt(user)
    }
  }

  generateJwt(user: UserEntity) {
    return sign({
      id: user.id,
      email: user.email
    }, 'secret')
  }
}
