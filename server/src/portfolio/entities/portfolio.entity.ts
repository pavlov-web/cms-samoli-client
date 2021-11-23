import {BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('portfolio')
export class PortfolioEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	slug: string;

	@Column()
	service: string;

	@Column('simple-array', {default: null})
	gallery: string[];

	@Column({default: ''})
	after_photo: string;

	@Column({default: ''})
	before_photo: string;

	@Column({default: ''})
	content: string;

	@Column({default: ''})
	video: string;

	@Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
	createAt: Date;

	@Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
	updateAt: Date;

	@BeforeUpdate()
	updateTimestamp() {
		this.updateAt = new Date();
	}
}
