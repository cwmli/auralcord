import React from "react";
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom'; 

import App from './App/App'; 

const root = document.getElementById( "app" );
Loadable.preloadReady().then(() => {
  ReactDOM.hydrate((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), root)
});
