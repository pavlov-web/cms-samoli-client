import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';
import { ServiceService } from '../service/service.service';
import { ServiceEntity } from '../service/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioEntity, ServiceEntity])],
  controllers: [PortfolioController],
  providers: [PortfolioService, ServiceService],
})
export class PortfolioModule {}