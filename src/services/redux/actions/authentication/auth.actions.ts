import { ThunkAction } from 'redux-thunk';
import { LoginUseCase } from '../../..//core/usecases/login/login.usecase';
import { UserLoginRequest } from '../../../core/usecases/login/login.request';
import { RootState } from '../../store';
import { IAuthAction, LOGIN } from './auth-actions.interface';
import { UsersRepository } from '../../../data/web/repositories/users.repository';
import { IUsersRepository } from '../../../core/repositories/users.repository';

export class AuthActions {
    private _repository: IUsersRepository;
    constructor() {
        // Determine which repo to use depending on environment
        // const environment = process.env.NODE_ENV || 'development';
        // if (environment == 'development') {
            this._repository = new UsersRepository();
        // }
    }

    public signIn(username: string, password: string): ThunkAction<void, RootState, null, IAuthAction> {
        return async dispatch => {
            try {
                const request = new UserLoginRequest(username, password);
                const loginUseCase = new LoginUseCase(this._repository);
                const userLoginViewModel = await loginUseCase.execute(request);
                const action: IAuthAction = {
                    type: LOGIN,
                    userLoginViewModel: userLoginViewModel
                };
                dispatch(action);
            } catch(e) {
                console.log(e);
            }
        };
    }
}