'use strict';
import { Provider } from 'react-redux'
var React = require('react');
var expect = require('expect');
import { AppContainer } from 'react-hot-loader';
import api from '../middleware/api';
const middlewares = [thunk, api]
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk'


import createMemoryHistory from 'history/createMemoryHistory'
import configureMockStore from 'redux-mock-store'

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const mockStore = configureMockStore(middlewares);
const store = mockStore({form:{login:{email:"test" , password:"test"}}, config: {}});

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

        var input = form.find("input#email").first();
        input.simulate('change', { target: { value: 'user@gmail.com' } })

        input = form.find("input#password").first();
        input.simulate('change', { target: { value: 'abc123' } })

        form.find('[type="submit"]').first().simulate("submit");

        let actionLength = store.getActions().length;
        // Check middleware action
        expect(store.getActions()[actionLength-2]).toEqual({type: 'AUTH_SUCCESS'});

        // Check start submit
        expect(store.getActions()[store.getActions().length-1]).toEqual({type: '@@redux-form/START_SUBMIT', meta: {form: 'login'}});

    });

});
