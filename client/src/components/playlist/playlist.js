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
    if (this.props.queriedPlaylist && !this.props.queriedPlaylist.isFetching) {
      let playlist = this.props.queriedPlaylist.data;

      return (
        <div className="ph4 pt4 vh-85">
          <div className="w-30-ns w-40-m flex flex-column pr3 br b--black-10 h-100">
            <div className="flex items-center pb1">
              <img className="w3 h3 pr3" src={playlist.images[0].url} alt='playlist-image' />
              <dl className="mt2 mb1 lh-copy">
                <dd className="ml0 f4 black b truncate w-100">{playlist.name}</dd>
                <dd className="ml0 f6 gray truncate w-100">{playlist.followers.total} Followers - {playlist.tracks.total} Tracks</dd>
                <dd className="ml0 f6 gray truncate w-100">by {playlist.owner.display_name}</dd>
              </dl>
            </div>
            <div className="f6 gray bb b--black-10 bw1 pb3" dangerouslySetInnerHTML={{__html: playlist.description}} />
            <div className="flex flex-column overflow-auto">
            {playlist.tracks.items.map((trackObj, i) => {
              return (
                <a key={i} href={trackObj.track.external_urls.spotify} className="flex dim items-center link lh-copy pa1 ph0-l bb b--black-10">
                  <img className="w2 h2 br3" src={trackObj.track.album.images[0].url} alt={trackObj.track.album.name + '-avatar'} />
                  <div className="pl3 flex-auto">
                    <span className="f6 b db black">{trackObj.track.name}</span>
                    <span className="f6 db black">{trackObj.track.artists[0].name} - {trackObj.track.album.name}</span>
                  </div>
                </a>
              )
            })}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>LOADING</div>
      )
    }
  }
}

const Playlist = connect(mapStateToProps, mapDispatchToProps)(ConnectedPlaylist);
export default Playlist;
