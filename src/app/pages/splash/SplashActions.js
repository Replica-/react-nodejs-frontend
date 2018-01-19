import { CALL_API, Schemas } from '../../../middleware/api';

export const STUDENT_REQUEST = 'STUDENT_REQUEST';
export const STUDENT_SUCCESS = 'STUDENT_SUCCESS';
export const STUDENT_FAILURE = 'STUDENT_FAILURE';

export const STUDENT_QUESTPATHS_REQUEST = 'STUDENT_QUESTPATHS_REQUEST';
export const STUDENT_QUESTPATHS_SUCCESS = 'STUDENT_QUESTPATHS_SUCCESS';
export const STUDENT_QUESTPATHS_FAILURE = 'STUDENT_QUESTPATHS_FAILURE';

export function fetchStudents() {
    return {
        [CALL_API]: {
            types: [ STUDENT_REQUEST, STUDENT_SUCCESS, STUDENT_FAILURE ],
            endpoint: '/students',
            method: 'GET',
            schema: Schemas.STUDENT_ARRAY
        }
    }
}

export function fetchQuestPaths() {
    return {
        [CALL_API]: {
            types: [ STUDENT_QUESTPATHS_REQUEST, STUDENT_QUESTPATHS_SUCCESS, STUDENT_QUESTPATHS_FAILURE ],
            endpoint: '/aggregators/getQuestPaths',
            method: 'GET',
            schema: Schemas.STUDENT_REFERENCE_ARRAY
        }
    }
}
