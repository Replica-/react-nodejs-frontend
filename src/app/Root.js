import React, { Component, PropTypes } from 'react'
import config from 'config'
import { Provider } from 'react-redux'
import { Route, Router, IndexRoute } from 'react-router'
import { connect } from 'react-redux';

import { setHidePage, setShowPage, getUser, sendFile } from './common/PortholeActions'
import { getCategory } from './nodes/NodeActions'

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

        const routerEnter = (/*nextState*/) => {

        }

        const loadData = ( ) => {

        }

        return (
            <Provider store={store}>
                <Router onUpdate={routerUpdate} history={history}>
                    <Route name="mainRoute" path="/" component={App}>
                        <IndexRoute component={SearchPage} onEnter={loadData} />
                        <Route name="Login" path="login" component={SystemSelectionPage}/>
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
        setHidePage: PropTypes.func.isRequired,
        setShowPage: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired,
        getCategory: PropTypes.func.isRequired,
        sendFile: PropTypes.func.isRequired,
        showPage: state.config.showPage,
        clearBreadcrumb: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, {setHidePage, setShowPage, clearBreadcrumb, getUser, sendFile, getCategory}) (Root)
