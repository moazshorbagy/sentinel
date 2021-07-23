import React, { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import './bottom-navigator.css';
import { IBottomNavigatorProps } from './props';

export const BottomNavigator: React.FC<IBottomNavigatorProps> = (
    props: IBottomNavigatorProps
) => {
    const [currentPage, setCurrentPage] = useState('');
    const linkClickHandler = (event: MouseEvent<HTMLAnchorElement>) => setCurrentPage(event.currentTarget.id);
    return (
        <footer className="bottom-navigator-container">
            {props.pages &&
                props.pages.map((page) => {
                    let className = 'navigator-button';
                    if (currentPage == page.key.toString()) {
                        className += ' focused-navigator-button';
                    }
                    return (
                        <Link id={page.key.toString()} onClick={linkClickHandler} key={page.key} className={className} to={page.url}>
                            <p className="navigator-button-text">{page.name}</p>
                        </Link>
                    );
                })}
        </footer>
    );
};
