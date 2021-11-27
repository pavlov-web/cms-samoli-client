import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  password: string;
}
