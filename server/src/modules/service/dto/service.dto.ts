import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly price: string;

  @IsOptional()
  readonly image: string;

  @IsOptional()
  readonly content: string;

  @IsOptional()
  readonly description: string;
}
