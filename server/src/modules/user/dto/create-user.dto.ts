import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsEmail({}, { message: 'Некорректный Email' })
  email: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  password: string;
}
