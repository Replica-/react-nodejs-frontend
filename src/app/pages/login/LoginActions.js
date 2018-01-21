import { CALL_API, Schemas } from '../../../middleware/api';
import { type } from 'common/Functions';

export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export const TOKEN_FAILURE = 'TOKEN_FAILURE'
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'

/**
 * Authenticate action - references API Middleware
 *
 * Simple request to authetnicate against API using login and password
 *
 * @param {login} Form to validate
 * @param {password} Dispatch action for redux
 *
 * @emits {error} Type checking on fields
 *
 * @return middleware object
 */
export function authenticate(login, password) {

    type(login, ["string"]);
    type(password, ["string"]);

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

/**
 * Fetch Token && Fetch token step- references API Middleware
 *
 * Request token from API to be carried out by API middle ware. This function is split up into two functions for simplicities sake
 *
 * @param {authcode} Authorisation code stored from user tree
 *
 * @return middleware object
 */
export function fetchToken() {

    return (dispatch, getState) => {
        // Check if authorization code exists
        return dispatch(fetchTokenStep(getState().user.authorizationCode));
    }
}
export function fetchTokenStep(authcode) {

    type(authcode, ["string"]);

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