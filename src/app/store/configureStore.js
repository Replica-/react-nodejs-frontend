import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../../middleware/api'
import analytics from '../../middleware/analytics'
import rootReducer from '../reducers'
import config from 'config'
import { composeWithDevTools } from 'redux-devtools-extension'

import { routerMiddleware } from 'react-router-redux';

window.dontCheck = false;
window.orientationReact = (window.innerWidth > window.innerHeight)?true:false;
window.startOrientationReact = window.orientationReact;
window.maxWidth = window.innerWidth;
window.minHeight = window.innerHeight;
window.maxHeight = screen.height;
window.minWidth = window.maxWidth - (window.maxHeight - window.minHeight);

if (window.innerWidth != 0) {
    window.dontCheck = true;
}

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

    const SCREEN_RESIZE = 'SCREEN_RESIZE';
    function screenResize(width, height) {
        return {
            type: SCREEN_RESIZE,
            screenWidth: width,
            screenHeight: height,
        };
    }

    window.addEventListener("orientationchange", function() {

        window.setTimeout(function() {
            var store = this;
            var width = 0;
            var height = 0;

            window.orientationReact = !window.orientationReact;

            if (window.orientationReact == 1){
                if (window.startOrientationReact) {
                    height = window.minHeight;
                    width = window.maxWidth;
                } else {
                    width = window.maxHeight;
                    height = window.minWidth;
                }

                var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                if (iOS) {
                    // Status bar tricks
                    height = height + 20;
                }
            } else {
                if (window.startOrientationReact) {
                    height = window.minWidth;
                    width = window.maxHeight;
                } else {
                    width = window.maxWidth;
                    height = window.minHeight;
                }
            }

            store.dispatch(screenResize(width, height));
        }.bind(store), 0);

    }, false);

    window.addEventListener('resize', () => {
        //if (window.dontCheck) return;

        window.setTimeout(function() {
            var store = this;
            var width = 0;
            var height = 0;

            window.orientationReact = (window.innerWidth > window.innerHeight)?true:false;
            window.maxWidth = window.innerWidth;
            window.minHeight = window.innerHeight;
            window.maxHeight = screen.height;
            window.minWidth = window.maxWidth - (window.maxHeight - window.minHeight);

            if (window.orientationReact == 1){
                width = window.maxHeight;
                height = window.minWidth;
            } else {
                width = window.maxWidth;
                height = window.minHeight;
            }

            // We're going thru several resizes - take the first one thats positive.
            if (height > 0) {
                window.dontCheck = true;
                window.startOrientationReact = window.orientationReact;
                store.dispatch(screenResize(width, height));
            }

        }.bind(store), 0);
    });

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

