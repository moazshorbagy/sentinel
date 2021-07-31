export interface IAppPagesState {
    pages: IPage[];
}

export enum PageAccessEnum {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}

export interface IPage {
    accessType: PageAccessEnum,
    url: string,
    name: string,
    key?: number
}