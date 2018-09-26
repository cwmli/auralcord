import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable';
import './index.css'

const App = Loadable({
  loader: () => import(/* webpackChunkName: "app" */'./App.js'),
  loading: () => <div>Loading</div>,
});

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)
