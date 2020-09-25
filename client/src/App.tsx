import React from 'react';
import logo from './logo.svg';
import './App.css';
import { UserList } from './components/UserList';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <UserList />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
