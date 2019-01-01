import {
  SUCCESS,
  PENDING,
  ERROR,
  FETCH_SPOTIFY_PROFILE,
  FETCH_SPOTIFY_TOP_ARTISTS,
  FETCH_SPOTIFY_TOP_TRACKS,
  FETCH_SPOTIFY_USER_PLAYLISTS
} from '../actions'

function statusAction(state = {isFetching: false, data: {}}, action) {
  switch(action.status) {
    case PENDING:
      return Object.assign({}, state, {
        succeeded: false,
        isFetching: true,
        data: {}
      })
    case SUCCESS:
      return Object.assign({}, state, {
        succeeded: true,
        isFetching: false,
        data: action.json
      })
    case ERROR:
      return Object.assign({}, state, {
        succeeded: false,
        isFetching: false,
        data: action.json
      })
    default:
      return state;
  }
}

function auralcordApp(state = {}, action) {
  switch(action.type) {
    case FETCH_SPOTIFY_PROFILE:
      return Object.assign({}, state, {
        spotify_profile: statusAction(state['spotify_profile'], action)
      })
    case FETCH_SPOTIFY_TOP_ARTISTS:
      return Object.assign({}, state, {
        spotify_top_artists: statusAction(state['spotify_top_artists'], action)
      })
    case FETCH_SPOTIFY_TOP_TRACKS:
      return Object.assign({}, state, {
        spotify_top_tracks: statusAction(state['spotify_top_tracks'], action)
      })
    case FETCH_SPOTIFY_USER_PLAYLISTS:
      return Object.assign({}, state, {
        spotify_user_playlists: statusAction(state['spotify_user_playlists'], action)
      })    
    default:
      return state;
  }
}

export default auralcordApp;
