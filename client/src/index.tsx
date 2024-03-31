import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './Reducers';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Client, cacheExchange, fetchExchange } from 'urql';
import { Provider as ProviderURQL } from 'urql';

const store = configureStore({ reducer: rootReducer });

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: 'include'
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ProviderURQL value={client}>
      <App />
    </ProviderURQL>
  </Provider>
  ,
  document.getElementById('root')
);
