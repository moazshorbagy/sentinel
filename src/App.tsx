import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { BottomNavigator } from './components/bottom-navigator';
import { IPageRoute } from './components/bottom-navigator/props';

import { TitleBar } from './components/title-bar';
import { LoginPage } from './pages/login';
import { TestPage } from './pages/test-page';

export const App: React.FC = () => {
    const pages: IPageRoute[] = [
        {
            url: '/login',
            name: 'route 1',
            key: 0,
        },
        {
            url: '/test-page',
            name: 'route 3',
            key: 2,
        },
    ];

    return (
        <>
            <TitleBar />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/test-page">
                        <TestPage />
                    </Route>
                </Switch>
                <BottomNavigator pages={pages} />
            </Router>
        </>
    );
};
