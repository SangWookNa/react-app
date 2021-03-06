import {
    USERINFO_POST,
    USERINFO_POST_SUCCESS,
    USERINFO_POST_FAILURE,
    USERINFO_GET,
    USERINFO_GET_SUCCESS,
    USERINFO_GET_FAILURE,
} from './ActionTypes';
import axios from 'axios';

/* USERINFO POST */
export function userinfoPostRequest(data) {
    return (dispatch) => {
        //inform USERINFO POST API is starting
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



/** USERINFO GET */

/*
*/

export function userinfoGetRequest(userid) {
    return (dispatch) => {
        // inform userinfo get API is starting
        dispatch(userinfoGet());

        let url = '/api/userinfo';

        url = `${url}/${userid}`

        return axios.get(url)
            .then((response) => {
                dispatch(userinfoGetSuccess(response.data));
            }).catch((error) => {
                dispatch(userinfoGetFailure());
            });
    };
}

export function userinfoGet() {
    return {
        type: USERINFO_GET
    };
}

export function userinfoGetSuccess(data) {
    return {
        type: USERINFO_GET_SUCCESS,
        data,
    };
}

export function userinfoGetFailure() {
    return {
        type: USERINFO_GET_FAILURE
    };
}