import { CALL_API, Schemas } from 'middleware/api';

export const BRANCHES_REQUEST = 'BRANCHES_REQUEST';
export const BRANCHES_SUCCESS = 'BRANCHES_SUCCESS';
export const BRANCHES_FAILURE = 'BRANCHES_FAILURE';

export const BRANCH_SAVE_REQUEST = 'BRANCH_SAVE_REQUEST';
export const BRANCH_SAVE_SUCCESS = 'BRANCH_SAVE_SUCCESS';
export const BRANCH_SAVE_FAILURE = 'BRANCH_SAVE_FAILURE';


export function fetchBranches() {
    return {
        [CALL_API]: {
            types: [ BRANCHES_REQUEST, BRANCHES_SUCCESS, BRANCHES_FAILURE ],
            endpoint: '/me/branches',
            method: 'GET',
            schema: Schemas.BRANCHES_ARRAY
        }
    }
}

export function saveBranch(branch) {

    return {
        [CALL_API]: {
            types: [ BRANCH_SAVE_REQUEST, BRANCH_SAVE_SUCCESS, BRANCH_SAVE_FAILURE ],
            endpoint: '/branch/' + branch.id,
            method: 'PATCH',
            schema: Schemas.BRANCHES,
            form: branch
        }
    }
}

export const SHOW_SUCCESS = 'SHOW_SUCCESS'
/*
export function formShowSuccess(form) {

    var test = {};

    test[nodeId] = note;

    return (dispatch, getState) => {
        dispatch({type:SYSTEM_SAVE_NOTE, response: { user: { config: { noteNodes: test }}}});
        return dispatch(saveUser(getState()));
    }
}
*/

