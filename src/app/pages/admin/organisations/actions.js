import { CALL_API, Schemas } from 'middleware/api';

export const ORG_SAVE_REQUEST = 'ORGANIASTION_SAVE_REQUEST';
export const ORG_SAVE_SUCCESS = 'ORGANIASTION_SAVE_SUCCESS';
export const ORG_SAVE_FAILURE = 'ORGANISATION_SAVE_FAILURE';

export const ORG_FETCH_REQUEST = 'ORGANIASTION_FETCH_REQUEST';
export const ORG_FETCH_SUCCESS = 'ORGANIASTION_FETCH_SUCCESS';
export const ORG_FETCH_FAILURE = 'ORGANISATION_FETCH_FAILURE';


export function saveOrgs(org) {

    return {
        [CALL_API]: {
            types: [ ORG_SAVE_REQUEST, ORG_SAVE_SUCCESS, ORG_SAVE_FAILURE ],
            endpoint: '/org/' + organisation.id,
            method: 'PATCH',
            schema: Schemas.ORGANISATIONS,
            form: org
        }
    }
}

export function fetchOrgs(ids) {
    return {
        [CALL_API]: {
            types: [ ORG_FETCH_REQUEST, ORG_FETCH_SUCCESS, ORG_FETCH_FAILURE ],
            endpoint: '/me/orgs',
            method: 'GET',
            schema: Schemas.ORGANISATIONS_ARRAY
        }
    }
}
