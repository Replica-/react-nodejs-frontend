import React, { Component } from 'react'


//import config from 'config'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom'
import { connect } from 'react-redux';

import TransitionGroup from "react-transition-group/TransitionGroup";
import AnimatedSwitch from "./AnimatedSwitch";

import LoginPage from '../app/login/LoginPage'
import NodePage from '../app/nodes/NodePage'

// Component Imports
import App from './App'

//import imagesLoaded from 'imagesloaded';

export class Root extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { store, history } = this.props

        const routerUpdate = () => {

        }

        const loadData = ( ) => {

        }

        //<IndexRoute component={} onEnter={loadData} />
        //component={nodePage}
        //onEnter={loadData}
        //onUpdate={routerUpdate}

//    <Provider store={store}>
        //  </Provider>
        return (
                <Route
                    render={({ location }) => (
                    <TransitionGroup component="main">
                        <AnimatedSwitch
                    key={location.key}
                    location={location}
                        >
                        <Route exact path="/" component={App} />
                        <Route exact path="/login"
                            render={props => (
                                <LoginPage {...props} />
                        )}
                        />
                <Route
                    path="/nodes"
                    render={props => (
                    <NodePage {...props}/>
                )}
                />
                <Route component={LoginPage} />
                        </AnimatedSwitch>
                        </TransitionGroup>
                )}
                />

        )
    }
}
//<DevTools />

const mapStateToProps = (state) => {
      return {

    }
}

export default connect(mapStateToProps, {}) (Root)
