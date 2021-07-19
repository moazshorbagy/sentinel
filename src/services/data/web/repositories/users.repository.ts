import { User } from '../../../core/entities/user';
import { IUsersRepository } from '../../../core/repositories/users.repository';
import { WebClient } from '../web.client';

export class UsersRepository extends WebClient implements IUsersRepository {
    async login(username: string, password: string): Promise<User> {
        try {
            const user = await this.instance.post<User>('/login', {
                username: username,
                password: password
            });
            console.log(user);
            return Promise.resolve(user);
        } catch(e) {
            Promise.reject(e);
        }
    }
}