import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSpotifyTopTracks } from '../../App/actions';

function mapStateToProps(state) {
  return {
    topTracks: state.spotify_top_tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserTopTracks: () => dispatch(fetchSpotifyTopTracks())
  };
}

class ConnectedTracks extends Component {
  
  componentDidMount() {
    this.props.getUserTopTracks();
  }

  render() {
    if (this.props.topTracks && !this.props.topTracks.isFetching) {
      return (
        <div>{JSON.stringify(this.props.topTracks)}</div>
      )
    } else {
      return (
        <div>TRACKS STAT CARD</div>
      )
    }
  }
}

const Tracks = connect(mapStateToProps, mapDispatchToProps)(ConnectedTracks);
export default Tracks;
