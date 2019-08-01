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
    get: {
        status: 'INIT',
        data: {},
        isLast: false
    }
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
        case types.USERINFO_GET:
            return update(state, {
                get: {
                    status: { $set: 'WAITING' },
                }
            });
        case types.USERINFO_GET_SUCCESS:
            return update(state, {
                get: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                }
            })
        case types.USERINFO_GET_FAILURE:
            return update(state, {
                get: {
                    status: { $set: 'FAILURE' }
                }
            });
        default:
            return state;

    }
}