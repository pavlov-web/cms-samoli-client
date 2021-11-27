import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { titleToSlug } from '../../helpers';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/service.dto';
import { ServiceEntity } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly repository: Repository<ServiceEntity>,
  ) {}

  async create(dto: CreateServiceDto) {
    const service = new ServiceEntity();
    Object.assign(service, dto);
    service.slug = titleToSlug(service.title);
    return await this.repository.save(service);
  }

  async update(id, dto: CreateServiceDto) {
    const service = await this.findById(id);
    Object.assign(service, dto);
    service.slug = titleToSlug(service.title);
    return await this.repository.save(service);
  }

  async findBySlug(slug: string) {
    return await this.repository.findOne(slug, { relations: ['portfolio'] });
  }

  async findById(id: number) {
    return await this.repository.findOne(id, { relations: ['portfolio'] });
  }

  async findByIds(ids: number[]) {
    return await this.repository.findByIds(ids, { relations: ['portfolio'] });
  }

  async findAll() {
    return await this.repository.find({ relations: ['portfolio'] });
  }

  async delete(id: number) {
    const service = await this.findById(id);
    service.portfolio = [];
    await this.repository.save(service);
    return await this.repository.delete(id);
  }
}
