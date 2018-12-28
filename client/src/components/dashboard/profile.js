import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../loaders/loading';
import { fetchSpotifyData, FETCH_SPOTIFY_PROFILE } from '../../App/actions';

function mapStateToProps(state) {
  return {
    profile: state.spotify_profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserProfile: () => dispatch(fetchSpotifyData(FETCH_SPOTIFY_PROFILE))
  };
}

class ConnectedProfile extends Component {

  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    if (this.props.profile && !this.props.profile.isFetching) {
      return (
        <div class="mw5 bg-white pa3 mv3 ba br4 b--black-10">
          <div class="tc mt3">
            <img src={this.props.profile.data.images[0].url} class="br-100 h3 w3 dib" title="profile_photo" />
            <h1 class="f4 mb1">
              {this.props.profile.data.display_name}
            </h1>
            <h6 class="black-20 mv0">({this.props.profile.data.id})</h6>
            <hr class="mw4 black-40" />
          </div>
          <p class="lh-copy measure center f6 black-70 mb3">
            <dl class="lh-title pa4 mt0">
              <dt class="f6 b">Followers</dt>
              <dd class="ml0">{this.props.profile.data.followers.total}</dd>
              <dt class="f6 b mt2">External URL</dt>
              <dd class="ml0"><a href={this.props.profile.data.external_urls.spotify}>Spotify</a></dd>
            </dl>
          </p>
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
