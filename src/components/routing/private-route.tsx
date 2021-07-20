import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../services/redux/store';
import { IEffectiveFinanceRouteProps } from './route.props';

export const PrivateRoute: React.FC<IEffectiveFinanceRouteProps> = ({
    component: RouteComponent,
    ...rest
}) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.token ? true : false);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <RouteComponent {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};
