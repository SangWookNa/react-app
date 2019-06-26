import {
    KAKAO_LOGIN, 
    KAKAO_LOGIN_SUCCESS,
    KAKAO_LOGIN_FAILURE,
} from './ActionTypes';
import axios from 'axios';

/* IMAGE UPLOAD */
export function kakaoLoginRequest(code) {
    return (dispatch) => {
        //inform MEMO POST API is starting
        dispatch(kakaoLogin());

        return axios.post('/api/kakao/', { code })
            .then((response) => {
                dispatch(kakaoLoginSuccess( response.data));
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
