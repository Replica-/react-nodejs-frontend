export const BREADCRUMB_POP = 'BREADCRUMB_POP'
export const BREADCRUMB_PUSH = 'BREADCRUMB_PUSH'
export const BREADCRUMB_CLEAR = 'BREADCRUMB_CLEAR'

// Fetch if not cached
export function pushBreadcrumb(path, title = null) {
    let nodeId = path.split("/").pop();

    return (dispatch) => {
        dispatch({type:BREADCRUMB_PUSH, response: {page: { stack: [path, title, nodeId] }}});
    }
}

// Fetch if not cached
export function popBreadcrumb(popAmount) {
    return (dispatch) => {
        dispatch({type:BREADCRUMB_POP, response: popAmount});
    }
}

// Fetch if not cached
export function clearBreadcrumb(category) {
    return (dispatch) => {
        dispatch({type:BREADCRUMB_CLEAR, response: {page: { stack: category }}});
    }
}