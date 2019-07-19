import {
    USERINFO_POST,
    USERINFO_POST_SUCCESS,
    USERINFO_POST_FAILURE,
} from './ActionTypes';
import axios from 'axios';

/* USERINFO POST */
export function userinfoPostRequest(data) {
    return (dispatch) => {
        //inform MEMO POST API is starting
        dispatch(userinfoPost());

        return axios.post('/api/userinfo/', { data })
            .then((response) => {
                dispatch(userinfoPostSuccess());
            }).catch((error) => {
                dispatch(userinfoPostFailure(error.response.data.code));
            });
    };
}

export function userinfoPost() {
    return {
        type: USERINFO_POST
    };
}

export function userinfoPostSuccess() {
    return {
        type: USERINFO_POST_SUCCESS
    };
}

export function userinfoPostFailure(error) {
    return {
        type: USERINFO_POST_FAILURE,
        error
    };
}
