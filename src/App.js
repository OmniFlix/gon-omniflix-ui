import React from 'react';
import Router from './Router';
import './App.css';
import Snackbar from './containers/Snackbar';

function App () {
    return (
        <div className="App">
            <Router/>
            <Snackbar/>
        </div>
    );
}

export default App;
