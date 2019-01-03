
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
export const FETCH_SPOTIFY_USER_PLAYLISTS = 'FETCH_SPOTIFY_USER_PLAYLISTS';
export const FETCH_SPOTIFY_QUERIED_PLAYLIST = 'FETCH_SPOTIFY_QUERIED_PLAYLIST';
export const FETCH_SPOTIFY_TRACK_FEATURES = 'FETCH_SPOTIFY_TRACK_FEATURES';

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
      return Promise.resolve();
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
      return Promise.resolve();
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
      return Promise.resolve();
    }
  }
}

export function fetchSpotifyUserPlaylists(params = {}) {
  return function(dispatch, getState) {
    var userPlaylists = getState().spotify_user_playlists;

    if (!userPlaylists || userPlaylists.status == ERROR || params.forceUpdate) {
      dispatch(spotifyAction(FETCH_SPOTIFY_USER_PLAYLISTS, PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + 'spotify/playlist' + queryString.stringify(params), 
          { credentials: 'include', headers: { 'Content-Type': 'application/json' } }
        ).then(
          response => response.json(),
          error => error
        ).then(
          response => {
            if (response.success) {
              dispatch(spotifyAction(FETCH_SPOTIFY_USER_PLAYLISTS, SUCCESS, response.data)); 
            } else {
              dispatch(spotifyAction(FETCH_SPOTIFY_USER_PLAYLISTS, ERROR, response.message));
            }
          });
    } else {
      return Promise.resolve();
    }
  }
}

export function fetchSpotifyQueriedPlaylist(playlistId, params = {}) {
  return function(dispatch, getState) {
    var userPlaylists = getState().spotify_queried_playlist;

    if (!userPlaylists || userPlaylists.status == ERROR || userPlaylists.id !== playlistId || params.forceUpdate) {
      dispatch(spotifyAction(FETCH_SPOTIFY_QUERIED_PLAYLIST, PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + 'spotify/playlist/' + playlistId + queryString.stringify(params), 
          { credentials: 'include', headers: { 'Content-Type': 'application/json' } }
        ).then(
          response => response.json(),
          error => error
        ).then(
          response => {
            if (response.success) {
              dispatch(spotifyAction(FETCH_SPOTIFY_QUERIED_PLAYLIST, SUCCESS, response.data)); 
            } else {
              dispatch(spotifyAction(FETCH_SPOTIFY_QUERIED_PLAYLIST, ERROR, response.message));
            }
          });
    } else {
      return Promise.resolve();
    }
  }
}

export function fetchSpotifyTrackFeatures(id, params = { ids: [] }) {
  return function(dispatch, getState) {
    var trackFeatures = getState().spotify_track_features;

    if (!trackFeatures || trackFeatures.status == ERROR || trackFeatures.id !== id || params.forceUpdate) {
      dispatch(spotifyAction(FETCH_SPOTIFY_TRACK_FEATURES, PENDING));

      return fetch(Settings.AURALCORD_ENDPOINT + 'spotify/track-features/?' + queryString.stringify(params), 
          { credentials: 'include', headers: { 'Content-Type': 'application/json' } }
        ).then(
          response => response.json(),
          error => error
        ).then(
          response => {
            if (response.success) {
              response.data.id = id; // keep track of tracks id
              dispatch(spotifyAction(FETCH_SPOTIFY_TRACK_FEATURES, SUCCESS, response.data)); 
            } else {
              dispatch(spotifyAction(FETCH_SPOTIFY_TRACK_FEATURES, ERROR, response.message));
            }
          });
    } else {
      return Promise.resolve();
    }
  }
}
