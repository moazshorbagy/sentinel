import React, { Component } from 'react';

import './title-bar.css';

type TitleBarState = {
    isMaximized: boolean
}

export class TitleBar extends Component<Record<string, never>, TitleBarState> {

    setIsMaximized(isMaximized: boolean): void {
        this.setState({
            isMaximized
        });
    }

    constructor(props: Record<string, never>) {
        super(props);
        this.state = { isMaximized: false };
    }

    componentDidMount(): void {
        window.Main.on('maximized', () => {
            this.setIsMaximized(true);
        });

        window.Main.on('unmaximized', () => {
            this.setIsMaximized(false);
        });
    }

    minimizeHandler = (): void => {
        window.Main.minimize();
    }

    maximizeHandler = (): void => {
        window.Main.maximize();
    }

    unmaximizeHandler = (): void => {
        window.Main.unmaximize();
    }

    closeHandler = (): void => {
        window.Main.close();
    }

    render(): JSX.Element {
        return (
            <div className='title-bar'>

                <div className="title-bar-drag-region"></div>

                <div className="title-bar-icon">
                </div>

                <div className="title-bar-menu-bar">
                    Add buttons here
                </div>

                <div className="title-bar-center">
                    My First Project - Effective Finance
                </div>

                <div className="title-bar-windows-controls">
                    <div className="windows-controls-box minimize-logo" onClick={this.minimizeHandler}>
                    </div>
                    {this.state.isMaximized ?
                        <div className="windows-controls-box unmaximize-logo" onClick={this.unmaximizeHandler}>
                        </div>
                        :
                        <div className="windows-controls-box maximize-logo" onClick={this.maximizeHandler}>
                        </div>
                    }
                    <div className="windows-controls-box close-logo" onClick={this.closeHandler}>
                    </div>
                </div>

                <div
                    className='resizer'
                    style={this.state.isMaximized ? { display: 'none' } : {}}
                >
                </div>
            </div>
        );
    }
}
