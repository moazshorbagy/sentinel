export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SESSION_TIMEOUT = 'SESSION_TIMEOUT';

interface ILoginAction {
    type: typeof LOGIN;
    token: string;
    loginTimestamp: Date;
}

export type IAuthAction = ILoginAction