import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/landing';
import Profile from './components/profile';

class router extends Component {
  render() {
    return (<Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/profile' component={Profile} />
    </Switch>)
  }
}

export default router;
