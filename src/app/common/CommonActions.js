export const SHOW_PAGE = 'SHOW_PAGE';
export const HIDE_PAGE = 'HIDE_PAGE'

export function showPage(pageName) {
    return (dispatch, getState) => {
        return dispatch({type:SHOW_PAGE, response: { config: { page : pageName }}});
    }
}

export function hidePage(pageName) {
    return (dispatch, getState) => {
        return dispatch({type:HIDE_PAGE, mode: "unset", response: { config: { page : null }}});
    }
}