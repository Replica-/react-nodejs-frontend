import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginPage from './login/LoginPage'
import NodePage from './nodes/NodePage'

import TopBar from './TopBar'
import { Provider } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Route, IndexRoute } from 'react-router-dom'

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
                                    path="/login"
                                    component={LoginPage}
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
                                    path="/nodes"
                                    component={NodePage}
                                />

                                </CSSTransitionGroup>

                            </div>

                            </div>
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