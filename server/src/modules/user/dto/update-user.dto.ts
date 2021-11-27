import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  firstName: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  lastName: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  position: string;
}
