import React, { Component } from 'react'
//import config from 'config'
import { Provider } from 'react-redux'
import { Route, Router, IndexRoute } from 'react-router'
import { connect } from 'react-redux';

import Login from '../app/login/LoginPage'

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

        /*
        const routerEnter = (nextState) => {

        }
        */

        const loadData = ( ) => {

        }

        //<IndexRoute component={} onEnter={loadData} />
        //component={nodePage}
        //onEnter={loadData}
        //onUpdate={routerUpdate}
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route name="root" path="/" component={App}>
                        <IndexRoute component={Login} />
                        <Route name="login" path="/login" component={Login}/>
                        <Route name="test" path="/test" component={Login}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}
//<DevTools />

const mapStateToProps = (state) => {
      return {

    }
}

export default connect(mapStateToProps, {}) (Root)
