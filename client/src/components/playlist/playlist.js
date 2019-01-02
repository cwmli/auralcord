import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSpotifyUserPlaylists } from '../../App/actions';

function mapStateToProps(state) {
  return {
    queriedPlaylist: state.spotify_user_playlists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaylist: (id) => dispatch(fetchSpotifyUserPlaylists(id))
  };
}
class ConnectedPlaylist extends Component {

  componentDidMount() {
    this.props.getPlaylist(this.props.match.params.id);
  }
  
  render() {
    return (
      <div>{this.props.match.params.id}</div>
    )
  }
}

const Playlist = connect(mapStateToProps, mapDispatchToProps)(ConnectedPlaylist);
export default Playlist;
