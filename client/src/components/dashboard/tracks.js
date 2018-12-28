import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSpotifyData, FETCH_SPOTIFY_TOP_TRACKS } from '../../App/actions';

function mapStateToProps(state) {
  return {
    top_tracks: state.spotify_top_tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserTopTracks: () => dispatch(fetchSpotifyData(FETCH_SPOTIFY_TOP_TRACKS))
  };
}

class ConnectedTracks extends Component {
  
  componentDidMount() {
    this.props.getUserTopTracks();
  }

  render() {
    <div>{JSON.parse(this.props.top_tracks)}</div>
  }
}

const Tracks = connect(mapStateToProps, mapDispatchToProps)(ConnectedTracks);
export default Tracks;
