import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/portfolio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';
import { Repository } from 'typeorm';
import { titleToSlug } from '../helpers';
import { ServiceService } from 'src/service/service.service';

@Injectable()
export class PortfolioService {
  constructor(
      @InjectRepository(PortfolioEntity)
      private readonly repository: Repository<PortfolioEntity>,
      private readonly servieService: ServiceService
  ) {}

  async create(dto: CreatePortfolioDto) {
    const portfolio = new PortfolioEntity();
    const {serviceIds, ...data} = dto;

    Object.assign(portfolio, data)
    portfolio.slug = titleToSlug(portfolio.title);
    portfolio.services = await this.servieService.findByIds(serviceIds)

    return await this.repository.save(portfolio);
  }

  async update() {}

  async findById(id: number) {
    return this.repository.findOne(id, {relations: ['services']})
  }

  async findAll() {}

  async delete() {}
}
