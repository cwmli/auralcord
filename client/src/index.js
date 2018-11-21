import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 

import App from './App/App';
import './css/index.css';

const root = document.getElementById( "app" );
ReactDOM.hydrate((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), root)
