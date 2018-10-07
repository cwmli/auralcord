import React, { Component } from 'react'
import Router from '../router';

import AppRoutes from './Routes';

class App extends Component {
  render() {
    return (<Router routes={AppRoutes} / >)
  }
}

export default App;