import { UserEntity } from "../entities/user.entity";

export interface IUserResponse extends Omit<UserEntity, 'hashPassword'> {
	token: string;
}