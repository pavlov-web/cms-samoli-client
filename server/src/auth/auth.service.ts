import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService,
  ) {}

  generateJwtToken(user: {id: number, email: string}) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload)
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByCond({email, password})

    if(user && user.password === password) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<UserEntity, 'password'>) {
    return {
      ...user,
      access_token: this.generateJwtToken(user),
    };
  }

  async register(dto: CreateUserDto) {
    const {password, ...user} = await this.userService.create(dto);
    return {
      ...user,
      token: this.generateJwtToken(user),
    };
  }
}