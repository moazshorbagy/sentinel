import { UserLoginViewModel } from '../../../core/usecases/login/login.viewmodel';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SESSION_TIMEOUT = 'SESSION_TIMEOUT';

interface ILoginAction {
    type: typeof LOGIN;
    userLoginViewModel: UserLoginViewModel
}

export type IAuthAction = ILoginAction
