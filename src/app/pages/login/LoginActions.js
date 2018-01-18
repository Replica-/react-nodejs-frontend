import { CALL_API, Schemas } from '../../../middleware/api';

export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export const TOKEN_FAILURE = 'TOKEN_FAILURE'

export const UPDATE_ACCOUNT_MANUAL = 'UPDATE_ACCOUNT_MANUAL'

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
export function authenticateUser(login, password) {
    return {
        [CALL_API]: {
            types: [ TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE ],
            endpoint: '/user/auth',
            method: 'POST',
            body: '{"data": {"type": "account","attributes": {"username": "' + login + '","password": "' + password + '"}}}',
            schema: Schemas.USER,
            form: {email: login, password: password},
            fetchToken: true
        }
    }
}
