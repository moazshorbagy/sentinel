import { IPage } from '../../states/app-pages.state';

export const CHANGE_PAGES = 'CHANGE PAGES';

interface IChangePagesAction {
    type: typeof CHANGE_PAGES;
    pages: IPage[];
}

export type IAppPagesAction = IChangePagesAction;