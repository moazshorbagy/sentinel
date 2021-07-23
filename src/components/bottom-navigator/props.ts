export interface IBottomNavigatorProps {
    pages: IPageRoute[];
}

export interface IPageRoute {
    url: string;
    name: string;
    key: number;
}