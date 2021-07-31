import React from 'react';
import './tool-bar.css';
import { IconButton } from './icon-button';
import copyIcon from './icons/copy_24dp.svg';
import cutIcon from './icons/cut_24dp.svg';
import pasteIcon from './icons/paste_24dp.svg';
import undoIcon from './icons/undo_24dp.svg';
import redoIcon from './icons/redo_24dp.svg';

export const ToolBar: React.FC = () => {
    const size = '24px';
    return (
        <div className="toolbar-container">
            <IconButton name="Undo" height={size} width={size} iconUrl={undoIcon} alt="undo_icon" />
            <IconButton name="Redo" height={size} width={size} iconUrl={redoIcon} alt="redo_icon" />
            <IconButton name="Copy" height={size} width={size} iconUrl={copyIcon} alt="copy_icon" />
            <IconButton name="Cut" height={size} width={size} iconUrl={cutIcon} alt="cut_icon" />
            <IconButton name="Paste" height={size} width={size} iconUrl={pasteIcon} alt="paste_icon" />
       </div>
    );
};
