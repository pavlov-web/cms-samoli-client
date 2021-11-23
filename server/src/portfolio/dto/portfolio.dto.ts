import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePortfolioDto {
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