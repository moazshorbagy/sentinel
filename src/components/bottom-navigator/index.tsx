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
        <footer className="bottom-navigator primary">
            {props.pages &&
                props.pages.map((page) => {
                    let className = 'navigator-button';
                    if (currentPage == page.key.toString()) {
                        className += ' p-dark';
                    }
                    return (
                        <div key={page.key} className="navigation-btn-container">
                            <Link id={page.key.toString()} onClick={linkClickHandler} className={className} to={page.url}>
                                <p className="navigator-button-text">{page.name}</p>
                            </Link>
                            <div className="separator p-dark"></div>
                        </div>
                    );
                })}
        </footer>
    );
};
