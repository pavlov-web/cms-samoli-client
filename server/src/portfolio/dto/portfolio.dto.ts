import { IsNotEmpty, IsOptional } from "class-validator";
import { ServiceEntity } from "src/service/entities/service.entity";

export class CreatePortfolioDto {
    @IsNotEmpty()
    readonly title: string;

    @IsOptional()
    readonly serviceIds: number[];

    @IsOptional()
    readonly gallery: string[];

    @IsOptional()
    readonly after_photo: string;

    @IsOptional()
    readonly before_photo: string;

    @IsOptional()
    readonly content: string;

    @IsOptional()
    readonly video: string;

    @IsOptional()
    review: string[];

    @IsOptional()
    category: string[];

    @IsOptional()
    fabric: string[];
}
