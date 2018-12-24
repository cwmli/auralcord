import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 

import App from './App/App';
import auralcordApp from './App/reducers';
import { fetchSpotifyProfile } from './App/actions';

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = createStore(auralcordApp, preloadedState, applyMiddleware(thunkMiddleware));
const root = document.getElementById( "app" );

ReactDOM.hydrate((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), root)

store.dispatch(fetchSpotifyProfile()).then(() => console.log(store.getState()))
