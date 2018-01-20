import { CALL_API, Schemas } from '../../../middleware/api';

export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export const TOKEN_FAILURE = 'TOKEN_FAILURE'
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'

// Fetch if not cached
export function clearTokens() {
    return (dispatch) => {
        dispatch(setLocalStorage('WCToken', '') );
        dispatch(setLocalStorage('WCTrustedToken', '') );

        dispatch({type:CLEAR_TOKENS, response: {localStorage: {WCToken: '', WCTrustedToken: ''}}});
    }
}

// Fetch if not cached
export function setTokens(trusted, trustedToken) {
    return (dispatch) => {
        dispatch(setLocalStorage('WCToken', trusted) );
        dispatch(setLocalStorage('WCTrustedToken', trustedToken) );

        return dispatch({type:SET_TOKENS, response: {localStorage: {WCToken: trusted, WCTrustedToken: trustedToken}}});
    }
}

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function authenticate(login, password) {
    return {
        [CALL_API]: {
            types: [ AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE ],
            endpoint: '/authorize',
            method: 'POST',
            body: '',
            schema: Schemas.USER,
            form: {username: login, password: password},

        }
    }
}

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchToken() {

    return (dispatch, getState) => {
        // Check if authorization code exists
        console.error(getState().entities.user.authorizationCode);
        return dispatch(fetchTokenStep(getState().entities.user.authorizationCode));
    }
}

export function fetchTokenStep(authcode) {
    return {
        [CALL_API]: {
            types: [ TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE ],
            endpoint: '/accesstoken',
            method: 'POST',
            schema: Schemas.USER,
            form: {authorization_code: authcode}
        }
    }
}