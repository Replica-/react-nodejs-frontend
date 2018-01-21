'use strict';
import { Provider } from 'react-redux'
var React = require('react');
var expect = require('expect');
import { AppContainer } from 'react-hot-loader';
const middlewares = [thunk]
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk'

import ConnectedApp, { App } from '../app/App';

import createMemoryHistory from 'history/createMemoryHistory'
import configureMockStore from 'redux-mock-store'

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const mockStore = configureMockStore(middlewares);
const store = mockStore({config: {}});

function setup() {

    const wrapper = mount(<Provider store={store}><ConnectedApp/></Provider>)

    return {
        wrapper
    }
}

describe('APP COMPONENT #', function () {

    it('Renders', () => {
        const { wrapper } = setup();
        expect(wrapper).toBeTruthy();

        expect(wrapper.find(App).length).toEqual(1);
    });

    it('Props', () => {
        const { wrapper } = setup();
        expect(wrapper.find(App).props().auth).toEqual(false);
        expect(wrapper.find(App).props().show).toEqual(false);
    });


});
