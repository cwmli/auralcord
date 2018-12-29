
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

function spotifyAction(type, status, json = {}) {
  return {
    type: type,
    status: status,
    json: json
  }
}

export function fetchSpotifyProfile() {
  return function(dispatch, getState) {

    var profile = getState().spotify_profile;

    if (!profile || profile.status == ERROR) {
      dispatch(spotifyAction(FETCH_SPOTIFY_PROFILE, PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + 'spotify/profile', 
          { credentials: 'include', headers: { 'Content-Type': 'application/json' } }
        ).then(
          response => response.json(),
          error => error
        ).then(
          response => {
            if (response.success) {
              dispatch(spotifyAction(FETCH_SPOTIFY_PROFILE, SUCCESS, response.data)); 
            } else {
              dispatch(spotifyAction(FETCH_SPOTIFY_PROFILE, ERROR, response.message));
            }
          });
    } else {
      Promise.resolve();
    }
  }
}

export function fetchSpotifyTopArtists(params = {}) {
  return function(dispatch, getState) {

    var topArtists = getState().spotify_top_artists;

    if (!topArtists || topArtists.status == ERROR) {
      dispatch(spotifyAction(FETCH_SPOTIFY_TOP_ARTISTS, PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + 'spotify/top/artists' + queryString.stringify(params), 
          { credentials: 'include', headers: { 'Content-Type': 'application/json' } }
        ).then(
          response => response.json(),
          error => error
        ).then(
          response => {
            if (response.success) {
              dispatch(spotifyAction(FETCH_SPOTIFY_TOP_ARTISTS, SUCCESS, response.data)); 
            } else {
              dispatch(spotifyAction(FETCH_SPOTIFY_TOP_ARTISTS, ERROR, response.message));
            }
          });
    } else {
      Promise.resolve();
    }
  }
}

export function fetchSpotifyTopTracks(params = {}) {
  return function(dispatch, getState) {

    var topTracks = getState().spotify_top_tracks;

    if (!topTracks || topTracks.status == ERROR) {
      dispatch(spotifyAction(FETCH_SPOTIFY_TOP_TRACKS, PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + 'spotify/top/tracks' + queryString.stringify(params), 
          { credentials: 'include', headers: { 'Content-Type': 'application/json' } }
        ).then(
          response => response.json(),
          error => error
        ).then(
          response => {
            if (response.success) {
              dispatch(spotifyAction(FETCH_SPOTIFY_TOP_TRACKS, SUCCESS, response.data)); 
            } else {
              dispatch(spotifyAction(FETCH_SPOTIFY_TOP_TRACKS, ERROR, response.message));
            }
          });
    } else {
      Promise.resolve();
    }
  }
}
