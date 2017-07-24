import { CALL_API, Schemas } from '../../middleware/api';

export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCESS';
export const SAVE_USER_ERROR = 'SAVE_USER_ERROR';

export function saveUser(state) {
    return {
        [CALL_API]: {
            types: [ SAVE_USER_REQUEST, SAVE_USER_SUCCESS, SAVE_USER_ERROR ],
            method: 'PUT',
            endpoint: 'user',
            schema: Schemas.NONE,
            body: JSON.stringify(state.user.config),
        }
    }
}

