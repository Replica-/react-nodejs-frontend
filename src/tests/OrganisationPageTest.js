'use strict';
import { Provider } from 'react-redux'
var React = require('react');
var expect = require('expect');
import { AppContainer } from 'react-hot-loader';
import api from '../middleware/api';
const middlewares = [thunk, api]
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk'
import { spy } from 'sinon'


import createMemoryHistory from 'history/createMemoryHistory'
import configureMockStore from 'redux-mock-store'
import MockRouter from 'react-mock-router';

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore(middlewares);
const store = mockStore({form:{login:{email:"test" , password:"test"}}, config: {}});


import OrganisationListPage from '../app/pages/admin/organisations/OrganisationListPage';
import OrganisationListViewPage from '../app/pages/admin/organisations/OrganisationListViewPage';
import OrganisationListViewForm from '../app/pages/admin/organisations/OrganisationListViewForm';

function setup() {

    const mockHistory = { location: {pathname: "/OrganisationPage"}, push: ()=>{} };
    const pushHistoryStub = sinon.stub(mockHistory, "push");

    const wrapper = mount(<Provider store={store}><OrganisationListPage history={mockHistory}/></Provider>)
    const component = wrapper.find(OrganisationListPage);
    //const form = wrapper.find(LoginForm);


    return {
        wrapper,
        component,
        spy,
        pushHistoryStub
    }
}

describe('ORGANISATION LIST PAGE COMPONENT #', function () {

    it('Renders', () => {
        const { wrapper, component } = setup();
        expect(wrapper).toBeTruthy();
        expect(component).toBeTruthy();

    });

    it('Click into Add Organisation Changes Location', () => {
        const { wrapper, component, spy, pushHistoryStub } = setup();

        var input = component.find("#addButton").first();
        input.simulate('click');

        expect(pushHistoryStub.calledOnce).toBeTruthy()
    });

});
