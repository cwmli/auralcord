import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../loaders/loading';
import { fetchSpotifyProfile } from '../../App/actions';

function mapStateToProps(state) {
  return {
    profile: state.spotify_profile
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
      return (
        <div className="mw5 bg-white pa3 ma3 ba br4 b--black-10">
          <div className="tc mt3">
            <img src={this.props.profile.data.images[0].url} className="br-100 h3 w3 dib" title="profile_photo" />
            <h1 className="f4 mb1">
              {this.props.profile.data.display_name}
            </h1>
            <h6 className="black-20 mv0">({this.props.profile.data.id})</h6>
            <hr className="mw4 black-40" />
          </div>
          <p className="lh-copy measure center f6 black-70 mb3">
            <dl className="lh-title pa4 mt0">
              <dt className="f6 b">Followers</dt>
              <dd className="ml0">{this.props.profile.data.followers.total}</dd>
              <dt className="f6 b mt2">External URL</dt>
              <dd className="ml0"><a href={this.props.profile.data.external_urls.spotify}>Spotify</a></dd>
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
