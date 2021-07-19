import { User } from '../../../core/entities/user';
import { IUsersRepository } from '../../../core/repositories/users.repository';

export class UsersRepository implements IUsersRepository {
    login(username: string, password: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
}