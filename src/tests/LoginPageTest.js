'use strict';
import { Provider } from 'react-redux'
var React = require('react');
var expect = require('expect');
import { AppContainer } from 'react-hot-loader';
const middlewares = [thunk]
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk'


import createMemoryHistory from 'history/createMemoryHistory'
import configureMockStore from 'redux-mock-store'

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const mockStore = configureMockStore(middlewares);
const store = mockStore({config: {}});

import LoginPage from '../app/pages/login/LoginPage';
import LoginForm from '../app/pages/login/LoginForm';

function setup() {

    const wrapper = mount(<Provider store={store}><LoginPage/></Provider>)
    const component = wrapper.find(LoginPage);
    const form = wrapper.find(LoginForm);

    return {
        wrapper,
        component,
        form
    }
}

describe('LOGIN PAGE COMPONENT #', function () {

    it('Renders', () => {
        const { wrapper, component } = setup();
        expect(wrapper).toBeTruthy();
        expect(component).toBeTruthy();

    });

    it('Type into input field', () => {
        const { wrapper, component, form } = setup();
       // form.simulate('submit');
        console.error(store.getState());

    });

});
