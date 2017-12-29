import * as React from 'react';
import './App.css';
import { Routes } from './routes';

// const logo = require('./images/logo.svg');

class App extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <Routes/>
            </div>
        );
    }
}

export default App;
