import React from "react";
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom'; 

import Loading from './components/public/loading';

const App = Loadable({
  loader: () => import(/* webpackChunkName: "app" */'./App/App'),
  loading: () => <Loading />,
});

const root = document.getElementById( "app" );
ReactDOM.hydrate((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), root)
