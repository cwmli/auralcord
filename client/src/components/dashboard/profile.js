import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../loaders/loading';
import { fetchSpotifyProfile } from '../../App/actions';

import Tabs from '../utils/tabs';
import Artists from './artists';
import Tracks from './tracks';
import Playlists from './playlists';

function mapStateToProps(state) {
  return {
    profile: state.spotify_profile,
    topArtists: state.spotify_top_artists,
    topTracks: state.spotify_top_tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserProfile: () => dispatch(fetchSpotifyProfile())
  };
}

class ConnectedProfile extends Component {

  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    if (this.props.profile && !this.props.profile.isFetching) {
      let topArtist = this.props.topArtists && this.props.topArtists.succeeded ? this.props.topArtists.data.artists[0].name : '-';
      let topTrack = this.props.topTracks && this.props.topTracks.succeeded ? this.props.topTracks.data.tracks[0].name + ' - ' + this.props.topTracks.data.tracks[0].artists[0].name : '-';

      return (
        <div className="pa3 w-100">
          <a className="flex items-center link dim" href={this.props.profile.data.external_urls.spotify}>
            <img src={this.props.profile.data.images[0].url} className="br-100 h3 w3 dib" title="profile_photo" />
            <div className="pl3 flex-auto">
              <h1 className="mv0">{this.props.profile.data.display_name}</h1>
              <span className="f5 black-40">{this.props.profile.data.id}</span>
            </div>
          </a>
          <dl className="dib mr5">
            <dd className="f6 f5-ns b ml0">Followers</dd>
            <dd className="f3 f2-ns b ml0">{this.props.profile.data.followers.total}</dd>
          </dl>
          <dl className="dib mr5">
            <dd className="f6 f5-ns b ml0">Top Artist</dd>
            <dd className="f3 f2-ns b ml0">{topArtist}</dd>
          </dl>
          <dl className="dib mr5">
            <dd className="f6 f5-ns b ml0">Top Track</dd>
            <dd className="f3 f2-ns b ml0">{topTrack}</dd>
          </dl>
          <div className="pv3">
            <Tabs>
              <Playlists name='Playlists' />
              <Artists name='Top Artists' />
              <Tracks name='Top Tracks' />
            </Tabs>
          </div>
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);
export default Profile;
