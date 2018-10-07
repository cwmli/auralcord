import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom'; 

import Loading from './components/public/loading';
import './index.css';

const App = Loadable({
  loader: () => import(/* webpackChunkName: "app" */'./App/App'),
  loading: () => <Loading />,
});

const root = document.querySelector('#app')
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), root)
