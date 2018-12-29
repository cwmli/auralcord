import React, { Component } from 'react';

import Profile from './profile';
import Artists from './artists';
import Tracks from './tracks';
class Dashboard extends Component {

  render() {
    return (
      <div className="pa4">
        <Profile />
        <Artists />
        <Tracks />
      </div>
    )
  }
}

export default Dashboard;
