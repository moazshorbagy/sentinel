import { User } from '../entities/user';

export interface IUsersRepository {
    login(username: string, password: string): Promise<User>;
}