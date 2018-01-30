import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form';

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

  return state;
}

// Updates an entity cache in response to any action with response.entities.
function config(state = { stack: [] }, action) {
  if (action.response && action.response.config) {

    if (action.type == 'BREADCRUMB_CLEAR') {
      state.stack = [];

      return merge({}, state);
    }

    if (action.type == 'BREADCRUMB_POP') {
      state.stack = state.stack.slice(0, -action.response);
      return merge({}, state);
    }

    if (action.type == 'BREADCRUMB_PUSH') {
      console.error(state);

      if (state.stack == null)
        state.stack = [action.response.config.stack];
      else
        state.stack.push(action.response.config.stack);

      return merge({}, state, {});
      //return state;
    }

    return merge({}, state, action.response.config)
  }

  return state;
}

const rootReducer = combineReducers({
  user,
  page,
  entities,
  config,
  form: reduxFormReducer,
  router: routerReducer
})

export default rootReducer
