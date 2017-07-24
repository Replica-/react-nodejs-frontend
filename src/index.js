import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import { createMemoryHistory } from 'react-router'

import Root from './app/Root'
import configureStore from './app/store/configureStore'
import { AppContainer } from 'react-hot-loader';

import './styles/App.less';
import './assets/bootstrap.css';


//import config from 'config';

//var tinymce = require('./assets/tinymce.min.js');
//$( window ).on( "throttledresize", throttledresizeHandler );

// invoke any methods defined in your JS files to begin execution
// Get the state tree
const history = createMemoryHistory()
const store = configureStore({}, history);

ReactDOM.render(
    < AppContainer >
    < Root store = {store} history = {history} / >
    < / AppContainer >,
    document.getElementById('react')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./app/Root', () => {
        const NextApp = require('./app/Root').default;

        ReactDOM.render(
            < AppContainer >
            < NextApp
            store = {store}
            history = {history} / >
            < / AppContainer >,
            document.getElementById('react'));
        }
    );
}


