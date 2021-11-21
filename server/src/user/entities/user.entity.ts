import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName?: string;

    @Column({nullable: true})
    lastName?: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date
}