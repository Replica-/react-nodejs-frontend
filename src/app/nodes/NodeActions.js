import { CALL_API, Schemas } from '../../middleware/api'
import merge from 'lodash/merge'
export const CATEGORY_RETRIEVE = 'CATEGORY_RETRIEVE'
export const CATEGORY_RETRIEVE_SUCCESS = 'CATEGORY_RETRIEVE_SUCCESS'
export const CATEGORY_RETRIEVE_ERROR = 'CATEGORY_RETRIEVE_ERROR'

export function getCategoryAPI(category) {
    return {
        [CALL_API]: {
            types: [ CATEGORY_RETRIEVE, CATEGORY_RETRIEVE_SUCCESS, CATEGORY_RETRIEVE_ERROR ],
            method: 'GET',
            endpoint: 'category/' + category,
            schema: Schemas.CATEGORY_ARRAY,
            parameter: category
        }
    }
}

export const NODES_SELECTION_RETRIEVE = 'NODES_SELECTION_RETRIEVE'
export const NODES_SELECTION_SUCCESS = 'NODES_SELECTION_SUCCESS'
export const NODES_SELECTION_ERROR = 'NODES_SELECTION_ERROR'

export function getFavourites() {
    return {
        [CALL_API]: {
            types: [ NODES_SELECTION_RETRIEVE, NODES_SELECTION_SUCCESS, NODES_SELECTION_ERROR ],
            method: 'GET',
            endpoint: 'category/favourites',
            schema: Schemas.CATEGORY_ARRAY,
        }
    }
}


export const NODES_DRAWINGS_RETRIEVE = 'NODES_DRAWINGS_RETRIEVE'
export const NODES_DRAWINGS_SUCCESS = 'NODES_DRAWINGS_SUCCESS'
export const NODES_DRAWINGS_ERROR = 'NODES_DRAWINGS_ERROR'

export function getNodesDrawing() {
    return {
        [CALL_API]: {
            types: [ NODES_DRAWINGS_RETRIEVE, NODES_DRAWINGS_SUCCESS, NODES_DRAWINGS_ERROR ],
            method: 'GET',
            endpoint: 'category/drawings',
            schema: Schemas.CATEGORY_ARRAY,
        }
    }
}


export const NODES_NOTES_RETRIEVE = 'NODES_NOTES_RETRIEVE'
export const NODES_NOTES_SUCCESS = 'NODES_NOTES_SUCCESS'
export const NODES_NOTES_ERROR = 'NODES_NOTES_ERROR'

export function getNodesNotes() {
    return {
        [CALL_API]: {
            types: [ NODES_NOTES_RETRIEVE, NODES_NOTES_SUCCESS, NODES_NOTES_ERROR ],
            method: 'GET',
            endpoint: 'category/notes',
            schema: Schemas.CATEGORY_ARRAY,
        }
    }
}

export const NODE_PUT = 'NODE_PUT'
export const NODE_PUT_SUCCESS = 'NODE_PUT_SUCCESS'
export const NODE_PUT_ERROR = 'NODE_PUT_ERROR'
export function saveNode(node, content, updateContent) {

    let contentValue = merge(content, updateContent);

    return {
        [CALL_API]: {
            types: [ NODE_PUT, NODE_PUT_SUCCESS, NODE_PUT_ERROR ],
            method: 'PUT',
            endpoint: 'category/' + node,
            schema: Schemas.NONE,
            body: JSON.stringify(contentValue)
        }
    }
}


export function getCategory(category, force = 0) {

    return (dispatch, getState) => {

        if (getState().entities.category) {
            const cat = getState().entities.category[parseInt(category)];

            if ((!force) && (cat && cat.loaded == 1)) {
                return dispatch({type: CATEGORY_RETRIEVE_SUCCESS, response: {}})

            }
        }

        return dispatch(getCategoryAPI(category))

    }
}
