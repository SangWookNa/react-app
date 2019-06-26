import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT',
        data : {},
        error: -1
    },
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
        default:
            return state;

    }
}