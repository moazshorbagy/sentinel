import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appPagesReducer } from './reducers/app-pages.reducer';
import { authReducer } from './reducers/auth.reducer';
import { productMixReducer } from './reducers/product-mix.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    appPages: appPagesReducer,
    productMix: productMixReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
