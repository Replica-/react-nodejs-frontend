import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import { sendMenuUpdate } from '../app/common/PortholeActions'
import config from 'config';

// Extracts the next page URL from Github API response.
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

    /*
    function fakeFetch (fullUrl) {

        var jsonData = {};

        jsonData.ok = true;
        jsonData.headers = {};
        jsonData.headers.get = function () {
            return false;
        }

        // Level 1

        if (fullUrl == "http://csr.app/rest/V1/categories/") {
            jsonData.json = function () {
                return new Promise((resolve, reject) => {
                    return resolve(JSON.parse('{"data":[{"type":"category","id":"111","attributes":{"id":"111","title":"Steel Framed Wall Systems", "type": "category"}},{"type":"category","id":"112","attributes":{"id":"112","title":"Timber Framed Wall Systems", "type": "category"}}]}'));
                });
            }
        }

        return Promise.resolve(jsonData);
    }
    */

    //fakeFetch vs fetch
    // window.config.auth.getEncryptedToken()

    var initObject = null;

    if (form) {

        var form_data = "";

        for ( var key in form ) {
            form_data = key + "=" + encodeURIComponent(form[key]) + "&" + form_data;
        }
        var userId = JSON.parse(window.config.auth.getToken()).userId;

        initObject = {
            method:method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Appid' : window.config.appId,
                'Token' : userId
            },
            body:form_data
        };
    } else {
        //'Token' : window.config.auth.getEncryptedToken(),
        var userId = "-1";

        if (JSON.parse(window.config.auth.getToken()) != null) {
            userId = JSON.parse(window.config.auth.getToken()).userId;
            window.react.userId = userId;
        } else {
            if (endpoint != "category/"){
                return Promise.reject("");
            }
        }

        initObject = {
            method:method,
            headers: {
                'Content-Type': 'application/json',
                'Token' : userId,
                'Appid' : window.config.appId
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

            if (json.data.type == "account") {
                store.dispatch(sendMenuUpdate(window.windowProxy, "", json.data.attributes.loyaltyPoints));
            }

            if (schema == 0){
                return Promise.resolve(json);
            }


            // Store user configguation
            if (schema == Schemas.USER) {
                return Promise.resolve({"user": json.data.attributes});
            }

            const camelizedJson = camelizeKeys(json.data)
            const nextPageUrl = getNextPageUrl(response)

            return Object.assign({},
                normalize(camelizedJson, schema),
                { nextPageUrl, parameter }
            )
        })

}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr
const categorySchema = new Schema('category', {
    idAttribute: 'id'
})

const systemSchema = new Schema('system', {
    idAttribute: 'id'
})


const userSchema = new Schema('user', {
    idAttribute: 'type'
})

// Schemas for Github API responses.
export const Schemas = {
    NONE: 0,
    CATEGORY: categorySchema,
    CATEGORY_ARRAY: arrayOf(categorySchema),
    SYSTEM: systemSchema,
    SYSTEM_ARRAY: arrayOf(systemSchema),
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

                // Remove their token and push them back to the authlocked page
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
            })) }
    )
}
