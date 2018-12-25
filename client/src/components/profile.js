import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchSpotifyProfile } from '../App/actions';

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
        <p>{ JSON.stringify(this.props.profile) }</p>
      )
    } else {
      return (
        <p>LOADING..</p>
      )
    }
  }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);
export default Profile;
