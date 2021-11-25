import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards';
import { CreatePortfolioDto } from './dto/portfolio.dto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async create( @Body() dto: CreatePortfolioDto) {
    return await this.portfolioService.create(dto);
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard)
  async update(@Param() id: number, @Body() dto: CreatePortfolioDto) {
    return await this.portfolioService.update(id, dto)
  }

  @Get('all')
  async findAll() {
    return await this.portfolioService.findAll();
  }

  @Get(':slug')
  async bySlug(@Param() slug: string) {
    return await this.portfolioService.findBySlug(slug);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number) {
    return await this.portfolioService.delete(id)
  }
}
