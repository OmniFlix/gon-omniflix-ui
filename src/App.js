import React from 'react';
import Router from './Router';
import './app.css';
import Snackbar from './containers/Snackbar';

function App () {
    return (
        <div className="app">
            <Router/>
            <Snackbar/>
        </div>
    );
}

export default App;
