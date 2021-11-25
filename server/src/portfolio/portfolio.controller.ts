import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/portfolio.dto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  async create(@Body() dto: CreatePortfolioDto) {
	  return this.portfolioService.create(dto);
  }

  @Get(':id')
  async findById(@Param() id: number) {
    return this.portfolioService.findById(id);
  }
}
