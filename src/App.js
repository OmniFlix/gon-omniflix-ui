import React from 'react';
import Router from './Router';
import './app.css';
import Snackbar from './containers/Snackbar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChainsList } from './chains';

const client = new ApolloClient({
    uri: ChainsList.stargaze.GRAPHQL_URL,
    cache: new InMemoryCache(),
});

function App () {
    return (
        <ApolloProvider client={client}>
            <div className="app">
                <Router/>
                <Snackbar/>
            </div>
        </ApolloProvider>
    );
}

export default App;
