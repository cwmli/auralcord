import React, { Component } from 'react';

import Profile from './profile';
class Dashboard extends Component {

  render() {
    return (
      <div className="pa4 flex items-start">
        <Profile />
      </div>
    )
  }
}

export default Dashboard;
