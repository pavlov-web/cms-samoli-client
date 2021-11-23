import { IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty({message: 'Поле не может быть пустым'})
    @IsEmail({},{message: 'Некорректный Email'})
    email: string;

    @IsNotEmpty({message: 'Поле не может быть пустым'})
    password: string;
}

export class UpdateUserDto {
    firstName: string;
    lastName: string;
}

export class LoginUserDto {
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    email: string;

    @IsNotEmpty({message: 'Поле не может быть пустым'})
    password: string;
}