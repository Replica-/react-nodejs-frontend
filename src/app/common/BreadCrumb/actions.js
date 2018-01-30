export const BREADCRUMB_POP = 'BREADCRUMB_POP'
export const BREADCRUMB_PUSH = 'BREADCRUMB_PUSH'
export const BREADCRUMB_CLEAR = 'BREADCRUMB_CLEAR'

// Fetch if not cached
export function pushBreadcrumb(path, title = null) {
    let nodeId = path.split("/").pop();

    return (dispatch) => {
        dispatch({type:BREADCRUMB_PUSH, mode: "push", response: {config: { stack: [path, title, nodeId] }}});
    }
}

// Fetch if not cached
export function popBreadcrumb(popAmount) {
    return (dispatch) => {
        dispatch({type:BREADCRUMB_POP, mode: "pop", response: {config: {stack : popAmount }}});
    }
}

// Fetch if not cached
export function clearBreadcrumb(category) {
    return (dispatch) => {
        dispatch({type:BREADCRUMB_CLEAR, mode: "set", response: {config: { stack : [] }}});
    }
}