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
}

export class UpdatePortfolioDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly service: string;

    readonly gallery: string[];

    readonly after_photo?: string;

    readonly before_photo?: string;

    readonly content?: string;

    readonly video?: string;
}