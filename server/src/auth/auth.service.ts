import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByCond({email, password})

    if(user && user.password === password) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<UserEntity, 'password'>) {
    const payload = { email: user.email, sub: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}