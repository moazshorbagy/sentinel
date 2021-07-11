import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { LoginPage } from './pages/login';

export const App: React.FC = () => {
    return (
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
    );
}
