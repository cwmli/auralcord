
import fetch from 'cross-fetch';

import Settings from '../../../config/settings';
// status based actions identifiers
export const SUCCESS = 'SUCCESS';
export const PENDING = 'PENDING';
export const ERROR = 'ERROR';

export const FETCH_SPOTIFY_PROFILE = 'FETCH_SPOTIFY_PROFILE';
function spotifyProfileAction(status, json = {}) {
  return {
    type: FETCH_SPOTIFY_PROFILE,
    status: status,
    json: json
  }
}

// TODO: ADD THUNK FOR THIS
export function fetchSpotifyProfile() {
  return function(dispatch, getState) {

    var profile = getState().spotify_profile;

    if (!profile || profile.status == ERROR) {
      dispatch(spotifyProfileAction(PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + 'spotify/profile')
        .then(
          response => { dispatch(spotifyProfileAction(SUCCESS, response)) },
          error => { dispatch(spotifyProfileAction(ERROR, error)) });
    } else {
      Promise.resolve();
    }
  }
}
