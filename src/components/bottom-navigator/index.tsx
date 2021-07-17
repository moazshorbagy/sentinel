import React from 'react';
import { Link } from 'react-router-dom';

import './bottom-navigator.css';
import { IBottomNavigatorProps } from './props';

export const BottomNavigator: React.FC<IBottomNavigatorProps> = (
    props: IBottomNavigatorProps
) => {
    return (
        <footer className="bottom-navigator-container">
            {props.pages &&
        props.pages.map((page) => {
            let className = 'navigator-button';
            if (location.pathname == page.url) {
                className += ' focused-navigator-button';
            }
            if (page.key == 0) {
                className += ' leftmost-navigator-button';
            }
            return (
                <Link key={page.key} className={className} to={page.url}>
                    <p className="navigator-button-text">{page.name}</p>
                </Link>
            );
        })}
        </footer>
    );
};
