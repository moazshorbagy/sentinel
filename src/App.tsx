import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { BottomNavigator } from './components/bottom-navigator';
import { IPageRoute } from './components/bottom-navigator/props';
import { PrivateRoute } from './components/routing/private-route';
import { PublicRoute } from './components/routing/public-route';

import './app.css';
import { TitleBar } from './components/title-bar';
import { LoginPage } from './pages/login';
import { TestPage } from './pages/test-page';

export const App: React.FC = () => {
    const pages: IPageRoute[] = [
        {
            url: '/login',
            name: 'Login Page',
            key: 0,
        },
        {
            url: '/test-page',
            name: 'Protected Page',
            key: 2,
        },
    ];

    return (
        <div className="mainApp">
            <TitleBar />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <PublicRoute path="/login" component={LoginPage}/>
                    <PrivateRoute path="/test-page" component={TestPage} />
                </Switch>
                <BottomNavigator pages={pages} />
            </Router>
        </div>
    );
};
