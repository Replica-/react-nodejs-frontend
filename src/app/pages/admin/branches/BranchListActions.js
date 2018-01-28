import { CALL_API, Schemas } from 'middleware/api';

export const BRANCHES_REQUEST = 'BRANCHES_REQUEST';
export const BRANCHES_SUCCESS = 'BRANCHES_SUCCESS';
export const BRANCHES_FAILURE = 'BRANCHES_FAILURE';

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

export function saveBranch() {
    return {
        [CALL_API]: {
            types: [ BRANCHES_REQUEST, BRANCHES_SUCCESS, BRANCHES_FAILURE ],
            endpoint: '/me/branches',
            method: 'GET',
            schema: Schemas.BRANCHES_ARRAY
        }
    }
}

