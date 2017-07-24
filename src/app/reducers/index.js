import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { formOptions, formState, searchResult } from './search'

// Updates an entity cache in response to any action with response.entities.
function user(state = { }, action) {

  if (action.type == "USER_FAVOURITE_SET") {

    if (typeof state.config.favouriteNodes == 'undefined') {
      state.config.favouriteNodes = [];
    }

    if ((state.config.favouriteNodes).indexOf(action.response.user.config.favouriteNode) == -1) {
      state.config.favouriteNodes.push(action.response.user.config.favouriteNode);
    }

    return merge({}, state);
  }

  if (action.type == "USER_FAVOURITE_UNSET") {

    if ((state.config.favouriteNodes).indexOf(action.response.user.favouriteNode) != -1) {
      var index = state.config.favouriteNodes.indexOf(action.response.user.favouriteNode);
      if (index > -1 ) {
        state.config.favouriteNodes.splice(index, 1);
      }
    }

    return merge({}, state);
  }

  if (action.response && action.response.user) {

    console.error(action.response.user);

    return merge({}, state, action.response.user)
  }


  return state
}

function entities(state = { }, action) {

  if (action.type == 'NODES_SELECTION_SUCCESS') {
    state.favourites = {};
    state.favourites = action.response.result;

    var mg = merge({}, state, action.response.entities);
    return mg;
  }

  if (action.type == 'NODES_DRAWINGS_SUCCESS') {
    state.nodeDraw = {};
    state.nodeDraw = action.response.result;

    var mg = merge({}, state, action.response.entities);
    return mg;
  }

  if (action.type == 'NODES_NOTES_SUCCESS') {
    state.nodeNotes = {};
    state.nodeNotes = action.response.result;

    var mg = merge({}, state, action.response.entities);
    return mg;
  }

  // We need to store the node
  if (action.type == 'CATEGORY_RETRIEVE_SUCCESS') {

    if (action.response.result) {
      if (state.categories) {

        if (action.response.result[0] == action.response.parameter) {
          action.response.result = action.response.result.splice(1, action.response.result.length);
        }

        state.categories[action.response.parameter] = action.response.result;
      } else {
        state.categories                            = {};
        state.categories[action.response.parameter] = action.response.result;
      }

      if (action.response.parameter) {
        state.category[action.response.parameter]['loaded'] = 1;
      }
    }


  }

  if (action.response && action.response.entities) {

    var mg = merge({}, state, action.response.entities);

    return mg;
  }

  return state
}

// Updates an entity cache in response to any action with response.entities.
function page(state = { }, action) {

  if (action.type == 'BREADCRUMB_CLEAR') {
    state.stack = [];

    return merge({}, state);
  }

  if (action.type == 'BREADCRUMB_POP') {
    state.stack = state.stack.slice(0, -action.response);
    return merge({}, state);
  }

  if (action.type == 'BREADCRUMB_PUSH') {
    if (state.stack == null)
        state.stack = [action.response.page.stack];
    else
        state.stack.push(action.response.page.stack);

    return merge({}, state, {});
    //return state;
  }

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

const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  screenHeight: typeof window === 'object' ? window.innerHeight : null
};

const SCREEN_RESIZE = 'SCREEN_RESIZE';

function windowSize(state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
      return Object.assign({}, state, {
        screenWidth: action.screenWidth,
        screenHeight: action.screenHeight,
      });
  }

  return state;
}


const rootReducer = combineReducers({
  windowSize,
  entities,
  config,
  routing,
  page,
  form,
  user,
  formOptions,
  formState,
  searchResult
})

export default rootReducer
