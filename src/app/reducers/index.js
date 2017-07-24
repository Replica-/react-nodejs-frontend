import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { formOptions, formState, searchResult } from './search'

// Updates an entity cache in response to any action with response.entities.
function user(state = { }, action) {

  return state
}

function entities(state = { }, action) {

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
    return merge({}, state, action.response.config)
  }

  return state
}


const rootReducer = combineReducers({
  user,
  entities,
  config,
  routing,
})

export default rootReducer
