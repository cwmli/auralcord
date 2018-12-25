import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 

import App from './App/App';
import Store from './App/Store';

const root = document.getElementById( "app" );

ReactDOM.hydrate((
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), root)
