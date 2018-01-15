'use strict';

var React = require('react');
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var expect = require('expect');
import { AppContainer } from 'react-hot-loader';
const Root = require('../app/Root').default;
//var Root = require('../app/Root');
//import Index from '../index';
import createMemoryHistory from 'history/createMemoryHistory'
import configureStore from '../app/store/configureStore'

// Need to refactor Index.js  so we don't need to repeat ourselves
const history = createMemoryHistory({
    initialEntries: [ '/' ],  // The initial URLs in the history stack
    initialIndex: 0,          // The starting index in the history stack
    keyLength: 6,             // The length of location.key
    // A function to use to confirm navigation with the user. Required
    // if you return string prompts from transition hooks (see below)
    getUserConfirmation: null
});
window.react = Array();
window.react.history = history;
const store = configureStore({}, history);

describe('index', function () {
  it('renders without problems', function () {
   
    var index = ReactTestUtils.renderIntoDocument(<Root store={store} history={history}/>);
    expect(index). toBeTruthy();
    
  });
});
