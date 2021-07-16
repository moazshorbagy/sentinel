import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { TitleBar } from './components/title-bar';
import { LoginPage } from './pages/login';

export const App: React.FC = () => {
    return (
        <>
            <TitleBar />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LoginPage />
                    </Route>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </>
    );
};
