import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    videoList: {
        status: 'INIT',
        data: [],
    },
};

export default function video(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {        
        case types.VIDEO_LIST:
            return update(state, {
                videoList: {
                    status: { $set: 'WAITING' },
                }
            });
        case types.VIDEO_LIST_SUCCESS:
            return update(state, {
                videoList: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                }
            })
        case types.VIDEO_LIST_FAILURE:
            return update(state, {
                videoList: {
                    status: { $set: 'FAILURE' }
                }
            });       
        default:
            return state;

    }
}