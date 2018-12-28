import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSpotifyData, FETCH_SPOTIFY_TOP_ARTISTS } from '../../App/actions';

function mapStateToProps(state) {
  return {
    top_artists: state.spotify_top_artists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserTopArtists: () => dispatch(fetchSpotifyData(FETCH_SPOTIFY_TOP_ARTISTS))
  };
}

class ConnectedArtists extends Component {
  
  componentDidMount() {
    this.props.getUserTopArtists();
  }

  render() {
    <div>{JSON.parse(this.props.top_artists)}</div>
  }
}

const Artists = connect(mapStateToProps, mapDispatchToProps)(ConnectedArtists);
export default Artists;
