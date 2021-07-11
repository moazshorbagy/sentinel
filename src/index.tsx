import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { store } from './services/redux/store';

import { App } from './app';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
