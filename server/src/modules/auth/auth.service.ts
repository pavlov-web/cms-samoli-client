import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { UserEntity } from '../user/user.entity.js';
import { errors } from '../../errors/messages.js';
import { sign } from 'jsonwebtoken';

export interface IUserResponse
  extends Omit<UserEntity, 'updateTimestamp' | 'toJSON'> {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(dto: LoginAuthDto): Promise<IUserResponse> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException([errors.invalidLogin]);
    }

    const isPasswordCorrect = dto.password === user.password;
    if (!isPasswordCorrect) {
      throw new BadRequestException([errors.invalidPassword]);
    }

    return this.buildUserResponse(user);
  }

  async register(dto): Promise<IUserResponse> {
    const user = await this.userService.create(dto);
    return this.buildUserResponse(user);
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    const token = sign({ id: user.id, email: user.email }, 'secret', {
      expiresIn: '30d',
    });
    return { token, ...user };
  }
}
