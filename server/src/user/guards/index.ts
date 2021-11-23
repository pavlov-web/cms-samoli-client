import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IExpressRequest } from "src/types";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const requst = ctx.switchToHttp().getRequest<IExpressRequest>();
    if(requst.user) return true;
    throw new HttpException('Нет авторизации', HttpStatus.UNAUTHORIZED)
  }
}