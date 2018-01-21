import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../../middleware/api'
import analytics from '../../middleware/analytics'
import rootReducer from '../reducers'
import config from 'config'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(initialState = {}, history) {

    const reduxRouterMiddleware = routerMiddleware(history);

    var store = null;
    if (config.appEnv == 'dev'){
        store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(
                applyMiddleware(thunk, reduxRouterMiddleware, api, analytics, createLogger()),
            )
        )
    } else {
       store = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(thunk, reduxRouterMiddleware, api, analytics),
            )
        )
    }

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

