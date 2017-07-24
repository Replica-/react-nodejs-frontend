import React, { Component, PropTypes } from 'react'
//import config from 'config'
import { Provider } from 'react-redux'
import { Route, Router/*, IndexRoute */} from 'react-router'
import { connect } from 'react-redux';

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
        /*
        const loadData = ( ) => {

        }
        */

        //<IndexRoute component={} onEnter={loadData} />
        //component={nodePage}
        return (
            <Provider store={store}>
                <Router onUpdate={routerUpdate} history={history}>
                    <Route name="mainRoute" path="/" component={App}>
                        <Route name="Login" path="login"/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}
//<DevTools />

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
      return {
        clientHeight: state.windowSize.screenHeight,
        clientWidth: state.windowSize.screenWidth,

    }
}

export default connect(mapStateToProps, {}) (Root)
