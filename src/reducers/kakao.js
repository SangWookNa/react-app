import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT',
        data: {},
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        info: {},
    }
};

export default function kakao(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.KAKAO_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.KAKAO_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                }
            });
        case types.KAKAO_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' },
                }
            });
        case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true }
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    valid: { $set: true },
                    info: { $set: action.info }
                }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: { $set: false },
                    isLoggedIn: { $set: false }
                }
            });
        default:
            return state;

    }
}