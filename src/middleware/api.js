import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import { safe } from 'common/Functions';

import config from 'config';

// Next page for API that limit responses per page
function getNextPageUrl(response) {
    const link = response.headers.get('link')
    if (!link) {
        return null
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
    if (!nextLink) {
        return null
    }

    return nextLink.split(';')[0].slice(1, -1)
}
export const API_ROOT = config.API_ROOT;

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, method, body, store, parameter, form) {

    const fullUrl = ((endpoint.indexOf("http://") != 0 && endpoint.indexOf("https://") != 0)) ? API_ROOT + endpoint : endpoint

    var initObject = null;

    const token = safe(store.getState().entities,[ "user", "accessToken" ], null);

    if (form) {

        var form_data = "";

        for ( var key in form ) {
            form_data = key + "=" + encodeURIComponent(form[key]) + "&" + form_data;
        }

        initObject = {
            method:method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Access-Token' :token
            },
            body:form_data
        };
    } else {

        initObject = {
            method:method,
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Token' : token
            },
            body:body
        };
    }

    return fetch(fullUrl, initObject)
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {

            if (!response.ok) {
                return Promise.reject(json)
            }

            if (json.errors) {
                return Promise.reject(json.errors[0]);
            }

            if (schema == 0){
                return Promise.resolve(json);
            }

            const camelizedJson = camelizeKeys(json.data)
            const nextPageUrl = getNextPageUrl(response)

            if (schema._idAttribute == -1) {
                const camelizedJson = camelizeKeys(json.data)
                return Object.assign({},{entities: { user: camelizedJson}},
                    { nextPageUrl, parameter });
            }

            return Object.assign({},
                normalize(camelizedJson, schema),
                { nextPageUrl, parameter }
            );

        })

}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

const studentSchema = new Schema('student');
const studentReferenceSchema = new Schema('student', {
    idAttribute: 'userId'
});

const userSchema = new Schema('user', {
    idAttribute: -1
})

export const Schemas = {
    NONE: 0,
    STUDENT: studentSchema,
    STUDENT_ARRAY: arrayOf(studentSchema),
    STUDENT_REFERENCE_ARRAY: arrayOf(studentReferenceSchema),
    USER: userSchema
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')
export const DO_NOT_CALL_API = Symbol('Do Not Call API')
// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint } = callAPI
    let { method, body} = callAPI
    const { schema, types, parameter, form } = callAPI

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if ((!schema) && (schema !== 0)) {
        throw new Error('Specify one of the exported Schemas.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))

     return callApi(endpoint, schema, method, body, store, parameter, form).then(
         response => next(actionWith({
            response,
            type: successType
        })),
        error => {
            if (typeof(error) != 'undefined') {
                if (error.status == 403) {

                }

                // Remove their token, possibly retrieve a new one if auth code is still valid
                if ((error.status == 400) || (error.status == 401) || (error.message == "Failed to fetch") || (error.status == 500)) {

                }
            } else {
                error = {status: 500};
            }

            return next(actionWith({
                type: failureType,
                status: error.status,
                error: error.title || error.detail || error.message,
                message: error.detail || error.message || error.title
            }))
        }
    )
}
