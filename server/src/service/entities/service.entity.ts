import { PortfolioEntity } from "src/portfolio/entities/portfolio.entity";
import {BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({default: ''})
  price: string;

  @Column({default: ''})
  image: string;

  @Column({default: ''})
  content: string;

  @Column({default: ''})
  description: string;

  @ManyToMany(() => PortfolioEntity, portfolio => portfolio.services)
  portfolio: PortfolioEntity[];

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createAt: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updateAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date();
  }
}
