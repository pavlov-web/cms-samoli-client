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

  findById(id: number) {
    return this.repository.findOne(id)
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne(cond);
  }

  update(id: number, dto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.repository.delete(id);
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
