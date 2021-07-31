import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appPagesReducer } from './reducers/app-pages.reducer';
import { authReducer } from './reducers/auth.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    appPages: appPagesReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
