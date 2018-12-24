import {
  SUCCESS,
  PENDING,
  ERROR,
  FETCH_SPOTIFY_PROFILE,
} from '../actions'

function statusAction(state = {isFetching: false, data: {}}, action) {
  switch(action.status) {
    case PENDING:
      return Object.assign({}, state, {
        isFetching: true,
        data: {}
      })
    case SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.json
      })
    case ERROR:
      return Object.assign({}, state, {
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
    default:
      return state;
  }
}

export default auralcordApp;
