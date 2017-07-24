import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import createHistory from 'history/createMemoryHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
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
//const history = createMemoryHistory()
//const store = configureStore({}, history);

window.react = {};
//window.react.history = history;

const history = createMemoryHistory()
const store = configureStore({}, history);


const renderApp = Component =>
render(
<Provider store={store}>
    <ConnectedRouter history={history}>
    <Component />
    </ConnectedRouter>
    </Provider>
    ,
    document.getElementById("react")
);

renderApp(Root);

if (module.hot) module.hot.accept("./app/Root", () => renderApp(Root));

