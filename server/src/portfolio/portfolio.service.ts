import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/portfolio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';
import { Repository } from 'typeorm';
import { titleToSlug } from '../helpers';

@Injectable()
export class PortfolioService {
  constructor(
      @InjectRepository(PortfolioEntity)
      private readonly repository: Repository<PortfolioEntity>
  ) {}

  create(dto: CreatePortfolioDto) {
    const portfolio = new PortfolioEntity();
    Object.assign(portfolio, dto)
    portfolio.slug = titleToSlug(portfolio.title);

    return this.repository.save(portfolio);
  }

  findAll() {
    return this.repository.find();
  }

  findBySlug(slug: string) {
    return this.repository.findOne({ slug });
  }

  update(id: number, dto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }
}
