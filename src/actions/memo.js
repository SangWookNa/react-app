import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE,
    MEMO_LIST,
    MEMO_LIST_SUCCESS,
    MEMO_LIST_FAILURE,
    MEMO_REMOVE,
    MEMO_REMOVE_SUCCESS,
    MEMO_REMOVE_FAILURE,
    PASSWORD_CHECK,
    PASSWORD_CHECK_SUCCESS,
    PASSWORD_CHECK_FAILURE,
    MEMO_EDIT,
    MEMO_EDIT_SUCCESS,
    MEMO_EDIT_FAILURE,
} from './ActionTypes';
import axios from 'axios';

/* MEMO POST */
export function memoPostRequest(username, password, contents, enterid) {
    return (dispatch) => {
        //inform MEMO POST API is starting
        dispatch(memoPost());

        return axios.post('/api/memo/', { username, password, contents, enterid })
            .then((response) => {
                dispatch(memoPostSuccess());
            }).catch((error) => {
                dispatch(memoPostFailure(error.response.data.code));
            });
    };
}

export function memoPost() {
    return {
        type: MEMO_POST
    };
}

export function memoPostSuccess() {
    return {
        type: MEMO_POST_SUCCESS
    };
}

export function memoPostFailure(error) {
    return {
        type: MEMO_POST_FAILURE,
        error
    };
}

/** MEMO LIST */

/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' memo or 'new' memo
        - id:        OPTIONAL; memo id (one at the bottom or one at the top)
        - username:  OPTIONAL; find memos of following user
*/

export function memoListRequest(isInitial, listType, id, username) {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(memoList());

        let url = '/api/memo';

        if (typeof username === "undefined") {
            // username not given, load public memo
            url = isInitial ? url : `${url}/${listType}/${id}`
        } else {
            //load memos of specific user
            url = isInitial ? `${url}/${username}` : `${url}/${username}/${listType}/${id}`;
        }

        return axios.get(url)
            .then((response) => {
                dispatch(memoListSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                dispatch(memoListFailure());
            });
    };
}

export function memoList() {
    return {
        type: MEMO_LIST
    };
}

export function memoListSuccess(data, isInitial, listType) {
    return {
        type: MEMO_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function memoListFailure() {
    return {
        type: MEMO_LIST_FAILURE
    };
}

/** MEMO REMOVE */
export function memoRemoveRequest(id, index) {
    return (dispatch) => {
        dispatch(memoRemove());

        return axios.delete('/api/memo/' + id)
            .then((response) => {
                dispatch(memoRemoveSuccess(index));
            }).catch((error) => {
                dispatch(memoRemoveFailure(error.response.data.code));
            });
    };
}

export function memoRemove() {
    return {
        type: MEMO_REMOVE
    }
}

export function memoRemoveSuccess(index) {
    return {
        type: MEMO_REMOVE_SUCCESS,
        index
    }
}

export function memoRemoveFailure(error) {
    return {
        type: MEMO_REMOVE_FAILURE,
        error
    };
}

export function passwordCheckRequest(id, password) {
    return (dispatch) => {
        dispatch(passwordCheck());

        return axios.post('/api/memo/check/', { id, password })
            .then((response) => {
                dispatch(passwordCheckSuccess());
            }).catch((error) => {
                dispatch(passwordCheckFailure(error.response.data.code));
            });

    };
}
export function passwordCheck() {
    return {
        type: PASSWORD_CHECK
    };
}

export function passwordCheckSuccess() {
    return {
        type: PASSWORD_CHECK_SUCCESS
    };
}

export function passwordCheckFailure(error) {
    return {
        type: PASSWORD_CHECK_FAILURE,
        error
    };
}

/* MEMO EDIT */
export function memoEditRequest(id, contents, index) {
    return (dispatch) => {
        dispatch(memoEdit());

        return axios.put('/api/memo/' + id, { contents })
            .then((response) => {
                dispatch(memoEditSuccess(index, response.data.memo));
            }).catch((error) => {
                dispatch(memoEditFailure(error.response.data.code));
            });
    };
}

export function memoEdit() {
    return {
        type: MEMO_EDIT
    };
}

export function memoEditSuccess(index, memo) {
    return {
        type: MEMO_EDIT_SUCCESS,
        index,
        memo
    };
}

export function memoEditFailure(error) {
    return {
        type: MEMO_EDIT_FAILURE,
        error
    };
}
