import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSpotifyUserPlaylists } from '../../App/actions';

function mapStateToProps(state) {
  return {
    userPlaylists: state.spotify_user_playlists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserPlaylists: () => dispatch(fetchSpotifyUserPlaylists())
  };
}

class ConnectedPlaylists extends Component {
  
  componentDidMount() {
    this.props.getUserPlaylists();
  }

  render() {
    if (this.props.userPlaylists && !this.props.userPlaylists.isFetching) {
      return (
        <div className="bg-white">
          <h2 className="mv0">Your Playlists</h2>
          <hr className="bb bw1 b--black-10 mb3"/>
          <div className="flex flex-wrap">
            {this.props.userPlaylists.data.items.map((playlist, i) => {
              return (
                <div className="w-50 w-20-m w-10-l ph2">
                  <Link key={i} to={'/playlist/' + playlist.id} className="db link tc dim">
                    <div className="aspect-ratio aspect-ratio--1x1">
                      <div className="aspect-ratio--object cover" style={{backgroundImage: `url(${playlist.images[0].url})`}} />
                    </div>
                    <dl className="mt2 f6 lh-copy">
                      <dd className="ml0 black b truncate w-100">{playlist.name}</dd>
                      <dd className="ml0 gray truncate w-100">{playlist.tracks.total} Tracks</dd>
                    </dl>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div className="bg-white">
          <h2 className="mv0">Your Playlists</h2>
          <hr className="bb bw1 b--black-10 mb3"/>
        </div>
      )
    }
  }
}

const Playlists = connect(mapStateToProps, mapDispatchToProps)(ConnectedPlaylists);
export default Playlists;
