import React, { Component } from 'react';

import Profile from './profile';
class Dashboard extends Component {

  render() {
    return (
      <div className="flex-auto">
        <Profile />
      </div>
    )
  }
}

export default Dashboard;
