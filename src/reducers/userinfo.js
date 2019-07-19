import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    },
    remove: {
        status: 'INIT',
        error: -1
    },
    check: {
        status: 'INIT',
        error: -1
    },
    edit: {
        status: 'INIT',
        error: -1
    },
};

export default function userinfo(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.USERINFO_POST:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.USERINFO_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.USERINFO_POST_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;

    }
}