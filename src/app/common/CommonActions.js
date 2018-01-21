export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING'

export function showLoading() {
    return (dispatch/*, getState*/) => {
        return dispatch({type:SHOW_LOADING, response: { config: { show_loading : true }}});
    }
}

export function hideLoading() {
    return (dispatch/*, getState*/) => {
        return dispatch({type:HIDE_LOADING, response: { config: { show_loading : false }}});
    }
}

