import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/portfolio.dto';
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

    if(serviceIds?.length) {
      portfolio.services = await this.servieService.findByIds(serviceIds) || [];
    }
    return await this.repository.save(portfolio);
  }


  async update(id ,dto: CreatePortfolioDto) {
    const portfolio = await this.findById(id);
    const {serviceIds, ...data} = dto;
    Object.assign(portfolio, data)
    portfolio.slug = titleToSlug(portfolio.title);

    if(serviceIds?.length) {
      portfolio.services = await this.servieService.findByIds(serviceIds) || [];
    }
    return await this.repository.save(portfolio);
  }

  async findBySlug(slug: string) {
    return await this.repository.findOne(slug, {relations: ['services']})
  }

  async findById(id: number) {
    return await this.repository.findOne(id, {relations: ['services']})
  }

  async findByIds(ids: number[]) {
    return await this.repository.findByIds(ids, {relations: ['services']})
  }

  async findAll() {
    return await this.repository.find({relations: ['services']})
  }

  async delete(id: number) {
    const portfolio = await this.findById(id)
    portfolio.services = []
    await this.repository.save(portfolio)
    return await this.repository.delete(id)
  }
}
