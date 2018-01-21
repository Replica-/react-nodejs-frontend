'use strict';

var React = require('react');
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var expect = require('expect');
import { AppContainer } from 'react-hot-loader';
const middlewares = [thunk]
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk'
import { showLoading, hideLoading } from '../app/common/CommonActions'

const App = require('../app/App').default;

import createMemoryHistory from 'history/createMemoryHistory'
import configureMockStore from 'redux-mock-store'

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const initialState = {};
const mockStore = configureMockStore(middlewares);
const store = mockStore({config: null});

describe('COMMON ACTIONS #', function () {

    it('Show loading spinner', () => {
        store.dispatch(showLoading());
        let expectedActions = {"type":"SHOW_LOADING","response":{"config":{"show_loading":true}}};
        expect(store.getActions()[0]).toEqual(expectedActions);
    })

    it('Hide loading spinner', () => {
        store.dispatch(hideLoading());
        let expectedActions = {"type":"HIDE_LOADING","response":{"config":{"show_loading":false}}};
        expect(store.getActions()[1]).toEqual(expectedActions);
    })

});
