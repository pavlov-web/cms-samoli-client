import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators';
import { AuthGuard } from '../user/guards';
import { CreateServiceDto } from './dto/service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async create( @Body() dto: CreateServiceDto) {
    return await this.serviceService.create(dto);
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard)
  async update(@Param() id: number, @Body() dto: CreateServiceDto) {
    return await this.serviceService.update(id, dto)
  }

  @Get('all')
  async findAll() {
    return await this.serviceService.findAll();
  }

  @Get(':slug')
  async bySlug(@Param() slug: string) {
    return await this.serviceService.findBySlug(slug);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number) {
    return await this.serviceService.delete(id)
  }
}
