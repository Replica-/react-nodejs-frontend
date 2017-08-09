import 'babel-polyfill'
import React from 'react'
import ReactDOM, {render} from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";

import createMemoryHistory from 'history/createMemoryHistory'
import configureStore from './app/store/configureStore'

import { AppContainer } from 'react-hot-loader';

import './styles/App.less';

window.jQuery = require('jquery');
window.$ = require('jquery');

require('./assets/bootstrap/bootstrap.min.css');

require('./assets/metisMenu.css');
require('./assets/metisMenu.js');
require('./assets/bootstrap-theme/css/sb-admin-2.css');
require('./assets/bootstrap-theme/js/sb-admin-2.js');

//import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

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


const renderApp = Component => {
    const Root = require('./app/Root').default;

    render(
        < AppContainer >
            <Root store={store} history={history}/>
        </AppContainer>,
        document.getElementById("react")
    );
}

renderApp();

if (module.hot) module.hot.accept("./app/Root", () => renderApp());

