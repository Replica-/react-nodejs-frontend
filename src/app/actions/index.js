import config from 'config';
import _ from 'lodash'

export const API_ROOT = config.API_ROOT;
import { CALL_API, Schemas } from '../../middleware/api'

export const SHOW_SEARCH_RESULT = 'SHOW_SEARCH_RESULT'
export const SHOW_SEARCH_RESULT_ERROR = 'SHOW_SEARCH_RESULT_ERROR'
export const SHOW_SEARCH_RESULT_SUCCESS = 'SHOW_SEARCH_RESULT_SUCCESS'
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'

export const SEARCHPAGE_SWITCH = 'SEARCHPAGE_SWITCH'

// Fetch if not cached
export function showPage(pageIndex) {
    return (dispatch) => {
        dispatch({type:SEARCHPAGE_SWITCH, response: {page: { searchPage: { pageIndex: pageIndex }}}});
        return new Promise((resolve, reject) => {
                resolve();
        });
    }
}

export const submitSearch = (values) => {
    return {
        type: SUBMIT_SEARCH,
        values
    }
}

export const showSearchResult = (result) => {
    return {
        type: SHOW_SEARCH_RESULT,
        result
    }
}

export const getSearchResult = (searchData) => {

    console.log('searchData', searchData)

    var queryString = _.map(searchData, (v,k) => {

        if (k === 'discontinuous') {
            
            v = v ? 1 : 0
        }

        return encodeURIComponent(k) + '=' + encodeURIComponent(v)
        
    }).join('&')

    console.log('querystring', queryString)

    return {
        [CALL_API]: {
            types: [ SHOW_SEARCH_RESULT, SHOW_SEARCH_RESULT_SUCCESS ,SHOW_SEARCH_RESULT_ERROR ],
            method: 'GET',
            endpoint: 'csr/systemsearch?' + queryString,
            schema: Schemas.CATEGORY_ARRAY,
        }
    }
}