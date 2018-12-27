
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

export function fetchSpotifyProfile() {
  return function(dispatch, getState) {

    var profile = getState().spotify_profile;

    if (!profile || profile.status == ERROR) {
      dispatch(spotifyProfileAction(PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + 'spotify/profile', { credentials: 'include' })
        .then(
          response => response.json(),
          error => error)
        .then(
          response => {
            if (response.success) {
              dispatch(spotifyProfileAction(SUCCESS, response.data)); 
            } else {
              dispatch(spotifyProfileAction(ERROR, response.message));
            }
          });
    } else {
      Promise.resolve();
    }
  }
}
