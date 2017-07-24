import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
function user(state = { }, action) {
  if (action.response && action.response.user) {
    return merge({}, state, action.response.user)
  }
  return state
}

function entities(state = { }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

// Updates an entity cache in response to any action with response.entities.
function page(state = { }, action) {

  if (action.response && action.response.page) {
    return merge({}, state, action.response.page)
  }

  return state
}

// Updates an entity cache in response to any action with response.entities.
function config(state = { }, action) {

  if (action.response && action.response.config) {

    if (action.mode == "unset") {
      if (state.page) {
        delete state.page;
      }
      return merge({}, state);
    }

    return merge({}, state, action.response.config)
  }

  return merge({}, state);
}

const rootReducer = combineReducers({
  user,
  page,
  entities,
  config,
  router: routerReducer
})

export default rootReducer
