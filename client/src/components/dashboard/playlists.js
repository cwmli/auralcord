import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
  
  };
}

class ConnectedPlaylists extends Component {
  
  render() {
    return (
      <div></div>
    )
  }
}

const Playlists = connect(mapStateToProps, mapDispatchToProps)(ConnectedPlaylists);
export default Playlists;
