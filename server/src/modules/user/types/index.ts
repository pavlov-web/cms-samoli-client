import { UserEntity } from '../user.entity';

export interface IUserResponse extends Omit<UserEntity, 'hashPassword'> {
  token: string;
}
