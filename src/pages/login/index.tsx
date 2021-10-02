import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../services/redux/actions/authentication/auth.actions';
import { ProductMixPage } from '../product-mix';

export const LoginPage: React.FC = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameChangeListener = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const passwordChangeListener = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };


    console.log(location.href);

    const onSubmit = () => {
        const authActions = new AuthActions();
        dispatch(authActions.signIn(username, password));
    };

    return (
        <div>
            <ProductMixPage />
        </div>
    );
};
