import React, { Component } from 'react';

class Playlists extends Component {
  
  render() {
    return (
      <div>{this.props.match.params.id}</div>
    )
  }
}

export default Playlists;
