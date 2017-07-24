import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import createMemoryHistory from 'history/createMemoryHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Route, IndexRoute } from 'react-router-dom'

import configureStore from './app/store/configureStore'
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux'
import './styles/App.less';
import './assets/bootstrap.css';

import LoginPage from './app/login/LoginPage'
import NodePage from './app/nodes/NodePage'
import TopBar from './app/TopBar'

import { CSSTransitionGroup } from 'react-transition-group'

//import config from 'config';

//var tinymce = require('./assets/tinymce.min.js');
//$( window ).on( "throttledresize", throttledresizeHandler );

// invoke any methods defined in your JS files to begin execution
// Get the state tree
//const history = createMemoryHistory()
//const store = configureStore({}, history);

window.react = {};


const history = createMemoryHistory({
    initialEntries: [ '/' ],  // The initial URLs in the history stack
    initialIndex: 0,          // The starting index in the history stack
    keyLength: 6,             // The length of location.key
    // A function to use to confirm navigation with the user. Required
    // if you return string prompts from transition hooks (see below)
    getUserConfirmation: null
});

window.react.history = history;

const store = configureStore({}, history);


const renderApp = Component =>
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
    <Route render={({ location }) => (
            <div className="wrapper">
                <TopBar/>
                <div>

                        <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                            >

                            <Route
location={location}
key={location.key}
path="/nodes"
component={NodePage}
    />
                       </CSSTransitionGroup>

    <CSSTransitionGroup
transitionName="fade"
transitionEnterTimeout={500}
transitionLeaveTimeout={500}
    >

    <Route
location={location}
key={location.key}
path="/login"
component={LoginPage}
    />
    </CSSTransitionGroup>


            </div>

            </div>
)}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("react")
);

renderApp();

if (module.hot) module.hot.accept("./index", () => renderApp());

