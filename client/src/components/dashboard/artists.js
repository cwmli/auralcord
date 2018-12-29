import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSpotifyTopArtists } from '../../App/actions';

function mapStateToProps(state) {
  return {
    topArtists: state.spotify_top_artists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserTopArtists: () => dispatch(fetchSpotifyTopArtists())
  };
}

class ConnectedArtists extends Component {
  
  componentDidMount() {
    this.props.getUserTopArtists();
  }

  render() {
    if (this.props.topArtists && !this.props.topArtists.isFetching) {
      return (
        <div>{JSON.stringify(this.props.topArtists)}</div>
      )
    } else {
      return (
        <div>ARTISTS STAT CARD</div>
      )
    }
  }
}

const Artists = connect(mapStateToProps, mapDispatchToProps)(ConnectedArtists);
export default Artists;
