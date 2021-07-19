import React, {ChangeEvent, MouseEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../services/redux/actions/authentication/auth.actions';

export const LoginPage: React.FC = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameChangeListener = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const passwordChangeListener = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    
    console.log(location.href);

    const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        const authActions = new AuthActions();
        dispatch(authActions.signIn(username, password));
    }

    return (
        <div>
            <form>
                Username: <input type="text" value={username} onChange={usernameChangeListener}/>
                <br/>
                Password: <input type="password" value={password} onChange={passwordChangeListener} />
                <br/>
                <button onClick={onSubmit}>Login</button>
            </form>
        </div>
    );
};
