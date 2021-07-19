import { IUseCase } from '../../base/usecase';
import { IUsersRepository } from '../../repositories/users.repository';
import { UserLoginRequest } from './login.request';
import { UserLoginViewModel } from './login.viewmodel';

export class LoginUseCase implements IUseCase<UserLoginRequest, UserLoginViewModel> {
    constructor(
        private _repository: IUsersRepository
    ) { }


    async execute(input: UserLoginRequest): Promise<UserLoginViewModel> {
        try {
            const response = await this._repository.login(input.username, input.password);
            return Promise.resolve(new UserLoginViewModel(response.token, response.loginTimestamp));
        } catch(e) {
            return Promise.reject(e);
        }
    }

}