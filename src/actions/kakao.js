import {
    KAKAO_LOGIN,
    KAKAO_LOGIN_SUCCESS,
    KAKAO_LOGIN_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* IMAGE UPLOAD */
export function kakaoLoginRequest(code) {
    return (dispatch) => {
        //inform MEMO POST API is starting
        dispatch(kakaoLogin());

        return axios.post('/api/kakao/', { code })
            .then((response) => {
                dispatch(kakaoLoginSuccess(response.data));
            }).catch((error) => {
                dispatch(kakaoLoginFailure());
            });
    };
}

export function kakaoLogin() {
    return {
        type: KAKAO_LOGIN
    };
}

export function kakaoLoginSuccess(data) {
    return {
        type: KAKAO_LOGIN_SUCCESS,
        data,
    };
}

export function kakaoLoginFailure() {
    return {
        type: KAKAO_LOGIN_FAILURE,
    };
}

/** GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());

        return axios.post('/api/kakao/getinfo', {})
            .then((response) => {
                dispatch(getStatusSuccess(response.data.info));
            }).catch((error) => {
                dispatch(getStatusFailure());
            });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(info) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        info
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}