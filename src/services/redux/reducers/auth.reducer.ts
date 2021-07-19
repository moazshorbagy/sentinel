import { IAuthAction, LOGIN } from '../actions/authentication/auth-actions.interface';
import { IAuthState } from '../states/auth.state';

const initialState: IAuthState = {
    token: null,
    loginTimestamp: null
};

export const authReducer = (prevState = initialState, action: IAuthAction): IAuthState => {
    switch (action.type) {
    case LOGIN: {
        return {
            ...prevState,
            token: action.userLoginViewModel.token,
            loginTimestamp: action.userLoginViewModel.loginTimestamp
        };
    }
    default: return prevState;
    }
};