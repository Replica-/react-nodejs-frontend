import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginPage from 'pages/login/LoginPage'
import SplashPage from 'pages/splash/SplashPage'


import App from './App'

import { Provider } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Route, IndexRoute, Redirect } from 'react-router-dom'
import { Row, Col, Grid, Button } from 'react-bootstrap';



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
         true ? (<Component {...props}/>) :
(
    <Redirect to={{
        pathname: '/login',
        state: { from: props.location }}}/>
)
)}/>
);

const Transition = ({ children, ...rest }) => (
    <CSSTransitionGroup
    transitionName="fade"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}>
        {children}
    </CSSTransitionGroup>
);

class Root extends Component {
    constructor (props) {
        super(props);

    }

    render() {
        const { store, history } = this.props

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Route render={({ location }) => (
                        <App>
                            <Transition>
                                <Route path="/" exact location={location}  key={location.key} component={LoginPage}/>
                            </Transition>

                            <Transition>
                                <Route
                                    location={location}
                                    key={location.key}
                                    path="/login"
                                    component={LoginPage}
                                />
                            </Transition>

                            <Transition>
                                <PrivateRoute
                                    location={location}
                                    key={location.key}
                                    path="/nodes"
                                    component={SplashPage}
                                />
                            </Transition>
                        </App>
                    )}/>
                </ConnectedRouter>
            </Provider>);
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default Root;