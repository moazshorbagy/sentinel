import { CHANGE_PAGES, IAppPagesAction } from '../actions/app-pages/app-pages.interface';
import { IAppPagesState } from '../states/app-pages.state';

const initialState: IAppPagesState = {
    pages: []
};

export const appPagesReducer = (prevState: IAppPagesState = initialState, action: IAppPagesAction) => {
    switch(action.type) {
    case CHANGE_PAGES: {
        return {
            ...prevState,
            pages: action.pages
        };
    }
    default: {
        return prevState;
    }
    }
};