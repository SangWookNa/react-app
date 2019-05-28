import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    upload: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
    },
};

export default function image(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.IMAGE_UPLOAD:
            return update(state, {
                upload: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.IMAGE_UPLOAD_SUCCESS:
            return update(state, {
                upload: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.IMAGE_UPLOAD_FAILURE:
            return update(state, {
                upload: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.IMAGE_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' },
                }
            });
        case types.IMAGE_LIST_SUCCESS:
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                }
            })
        case types.IMAGE_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            });
        default:
            return state;

    }
}