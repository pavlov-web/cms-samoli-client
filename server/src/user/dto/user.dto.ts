import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

export class UpdateUserDto {
    firstName: string;
    lastName: string;
}

export class LoginUserDto {
    email: string;
    password: string;
}