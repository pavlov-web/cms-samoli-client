import { ServiceEntity } from "src/service/entities/service.entity";
import {BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity('portfolio')
export class PortfolioEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	slug: string;

	@Column('simple-array', { default: null })
	gallery: string[];

	@Column({default: ''})
	after_photo: string;

	@Column({default: ''})
	before_photo: string;

	@Column({default: ''})
	content: string;

	@Column({default: ''})
	video: string;

	@ManyToMany(() => ServiceEntity, service => service.portfolio, {
		cascade: ["insert", "update", "remove", "soft-remove", "recover"],
		onDelete: 'CASCADE'
	})
	@JoinTable()
	services: ServiceEntity[];

	@Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
	createAt: Date;

	@Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
	updateAt: Date;

	@BeforeUpdate()
	updateTimestamp() {
		this.updateAt = new Date();
	}
}
