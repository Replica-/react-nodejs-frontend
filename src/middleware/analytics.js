import 'isomorphic-fetch'

/* Porthole Analytics */
// Action key that carries GA call info interpreted by this Redux middleware.
export const CALL_TRACK_EVENT = Symbol('Call GA')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => reactaction => {
    var gaDetails;

    store = store;

    // Pick up any router changes
    if ( reactaction.type == "@@router/LOCATION_CHANGE" && reactaction.payload.action != "REPLACE" && reactaction.payload.action != "PUSH") {

        gaDetails = {category: "page",
                    action: reactaction.payload.pathname.replace("/",""),
                    label: "visits",
                    log: ""};
    } else {
        gaDetails = reactaction[CALL_TRACK_EVENT]
    }

    if (typeof gaDetails === 'undefined') {
        return next(reactaction)
    }

    let { category, action, /*label, log*/} = gaDetails

    if (typeof category !== 'string') {
        throw new Error('Specify a category.')
    }

    if (typeof action !== 'string') {
        throw new Error('Specify an action.')
    }

    //store.dispatch(sendTrackEvent(category, action, label, log));

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_TRACK_EVENT]
        return finalAction
    }

    return next(actionWith(reactaction))
}
