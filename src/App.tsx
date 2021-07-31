import React, { useEffect } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { BottomNavigator } from './components/bottom-navigator';
import { PrivateRoute } from './components/routing/private-route';
import { PublicRoute } from './components/routing/public-route';

import './app.css';
import { TitleBar } from './components/title-bar';
import { LoginPage } from './pages/login';
import { TestPage } from './pages/test-page';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_PAGES, IAppPagesAction } from './services/redux/actions/app-pages/app-pages.interface';
import { IPage, PageAccessEnum } from './services/redux/states/app-pages.state';
import { RootState } from './services/redux/store';

export const App: React.FC = () => {
    const pages: IPage[] = [
        {
            accessType: PageAccessEnum.PUBLIC,
            url: '/login',
            name: 'Login Page',
            key: 0,
        },
        {
            accessType: PageAccessEnum.PRIVATE,
            url: '/test-page',
            name: 'Protected Page',
            key: 2,
        },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        const initialPagesAction: IAppPagesAction = {
            type: CHANGE_PAGES,
            pages: pages
        }
        dispatch(initialPagesAction);
    }, []);

    const currentAppPages = useSelector((state: RootState) => state.appPages.pages);

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
                <BottomNavigator pages={currentAppPages} />
            </Router>
        </div>
    );
};
