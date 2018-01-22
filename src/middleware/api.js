/*
* API Middleware
* The following code has been liberated from the internet, but heavily modified and extended for more flexible usage
*/

// Middleware action key
export const CALL_API = Symbol('Call API')

import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import { safe, type } from 'common/Functions';

import config from 'config';
export const API_ROOT = config.API_ROOT;

/**
 * GetNextPageUrl
 *
 * This function extracts "NextPageUrl" that is commonly used by API's such as Facebook or github to handle paged data
 *
 * @param {response} HTTP Response
 *
 * @return Next page url
 */
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

/**
 * Fetches the API response and normalises the resulting JSON according to a defined Schema - The response is then stored back into the state tree
 * @param {endpoint} URL End point
 * @param {schema} The responses structure so that the returning structure can be stored into the state tree in a consistent format.
 * @param {method} Request Method
 * @param {body} Request Raw Body (If form is defined, body is ignored)
 * @param {store} Redux Store
 * @param {parameter} Unused.
 * @param {form} Object is converted into a form friendly body and content type is also changed.
 *
 * @emits {Error} If submission form promise fails at any point it will throw an error, if the api returns an error submission error is thrown.
 *
 * @return promise
 */
function callApi(endpoint, schema, method, body, store, parameter, form) {

    const fullUrl = ((endpoint.indexOf("http://") != 0 && endpoint.indexOf("https://") != 0)) ? API_ROOT + endpoint : endpoint

    let initObject = null;

    // If we have the token, we need to store it in the headers on every request
    const token = safe(store.getState().user,[ "accessToken" ], null);

    type(form, "object", true);
    type(body, "string", true);
    type(method, "string");
    type(schema, ["object", "number"]);

    // If form is defined, convert the form field into
    if (form) {
        let formData = "";

        for ( var key in form ) {
            formData = key + "=" + encodeURIComponent(form[key]) + "&" + formData;
        }

        initObject = {
            method:method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Access-Token' :token
            },
            body:formData
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

            // If the schema doesn't assign entity, just store into state tree as is.
            if (schema._assignEntity === false) {
                const camelizedJson = camelizeKeys(json.data);

                let mergeObject = {};
                mergeObject[schema._key] = camelizedJson;

                return Object.assign({}, mergeObject,
                    { nextPageUrl, parameter });
            } else {
                return Object.assign({},
                    normalize(camelizedJson, schema),
                    { nextPageUrl, parameter }
                );
            }
        })
}

/*
* Normlizr (Schemas) is used to transform API responses to a flat form so that response can easily be merged into the state tree
* These schemas will at some stage be moved into the actions. API middleware should not be defining the schemas.
*/
const studentSchema = new Schema('student');
const studentReferenceSchema = new Schema('student', {
    idAttribute: 'userId'
});

const userSchema = new Schema('user', {
    assignEntity: false
})

export const Schemas = {
    NONE: 0,
    STUDENT: studentSchema,
    STUDENT_ARRAY: arrayOf(studentSchema),
    STUDENT_REFERENCE_ARRAY: arrayOf(studentReferenceSchema),
    USER: userSchema
}

/**
 * Middleware driver - Checks the action to ensure that it is a CALL_API action and that it is sanitised
 * @param {store} URL End point
 * @param {next} The responses structure so that the returning structure can be stored into the state tree in a consistent format.
 * @param {action} Request Method
 *
 * @emits {Error} Throws multiple errors
 *
 * @return next action Success or failure
 */
export default store => next => action => {
    const callAPI = action[CALL_API]

    // If the action doesn't contain the "CALL_API" key - just skip to the next action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint } = callAPI
    let { method, body} = callAPI
    const { schema, types, parameter, form } = callAPI

    // Retrieve the state from the endpoint - this is most likely never the case
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

    if (config.appEnv == "test") {

        return new Promise(function (resolve, reject) {
            next(actionWith({ type: successType }));
        });
    }


    return callApi(endpoint, schema, method, body, store, parameter, form).then(
         // Success response
         response => next(actionWith({
            response,
            type: successType
        })),
        error => {
            // Error response
            if (typeof(error) != 'undefined') {
                if (error.status == 403) {

                }

                // Remove their token, possibly retrieve a new one if auth code is still valid
                if ((error.status == 400) || (error.status == 401) || (error.message == "Failed to fetch") || (error.status == 500)) {

                }
            } else {
                // All other weird errors
                error = {status: 500};
            }

            // Store as much info about error message as possible
            return next(actionWith({
                type: failureType,
                status: error.status,
                error: error.title || error.detail || error.message,
                message: error.detail || error.message || error.title
            }))
        }
    )
}
