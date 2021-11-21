import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByCond({email, password})

    if(user && user.password === password) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }
}