
import fetch from 'cross-fetch';
import queryString from 'query-string';

import Settings from '../../../config/settings';
// status based actions identifiers
export const SUCCESS = 'SUCCESS';
export const PENDING = 'PENDING';
export const ERROR = 'ERROR';

export const FETCH_SPOTIFY_PROFILE = 'FETCH_SPOTIFY_PROFILE';
export const FETCH_SPOTIFY_TOP_ARTISTS = 'FETCH_SPOTIFY_TOP_ARTISTS';
export const FETCH_SPOTIFY_TOP_TRACKS = 'FETCH_SPOTIFY_TOP_TRACKS';

const SPOTIFY_ACTION_MAPPING = {
  FETCH_SPOTIFY_PROFILE: 'spotify/profile',
  FETCH_SPOTIFY_TOP_ARTISTS: 'spotify/top/artists',
  FETCH_SPOTIFY_TOP_TRACKS: 'spotify/top/tracks'
}

function spotifyAction(type, status, json = {}) {
  return {
    type: type,
    status: status,
    json: json
  }
}

export function fetchSpotifyData(type, opts = {}) {
  return function(dispatch, getState) {

    var profile = getState().spotify_profile;

    if (!profile || profile.status == ERROR) {
      dispatch(spotifyAction(type, PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + SPOTIFY_ACTION_MAPPING[type] + queryString.stringify(opts), 
          { credentials: 'include', 
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(
          response => response.json(),
          error => error)
        .then(
          response => {
            if (response.success) {
              dispatch(spotifyAction(type, SUCCESS, response.data)); 
            } else {
              dispatch(spotifyAction(type, ERROR, response.message));
            }
          });
    } else {
      Promise.resolve();
    }
  }
}
