import React from "react";
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom'; 

import Loading from './components/public/loading';

// const App = Loadable({
  // loader: function() { import(/* webpackChunkName: "app" */'./App/App') },
  // loading: function() { <Loading /> },
// });
import App from './App/App';

const root = document.getElementById( "app" );
ReactDOM.hydrate((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), root)
