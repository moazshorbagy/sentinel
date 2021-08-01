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
        <footer className="bottom-navigator">
            {props.pages &&
                props.pages.map((page) => {
                    let className = 'navigator-btn';
                    if (currentPage == page.key.toString()) {
                        className += ' navigator-btn-active';
                    } else {
                        className += ' navigator-btn-inactive';
                    }
                    return (
                        <div key={page.key} className="navigation-btn-container">
                            <Link id={page.key.toString()} onClick={linkClickHandler} className={className} to={page.url}>
                                <p className="navigator-btn-text">{page.name}</p>
                            </Link>
                            <div className="separator"></div>
                        </div>
                    );
                })}
        </footer>
    );
};
