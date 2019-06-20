import {
    VIDEO_LIST, 
    VIDEO_LIST_SUCCESS,
    VIDEO_LIST_FAILURE,
} from './ActionTypes';
import axios from 'axios';

/** VIDEO LIST */
/*
    Parameter:        
        - username:  OPTIONAL; find image of following user
*/

export function videoListRequest(username, invitee, seq) {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(videoList());

        let url = `/api/video/${username}/${invitee}/${seq}`;

        return axios.get(url)
            .then((response) => {
                dispatch(videoListSuccess(response.data));
            }).catch((error) => {
                dispatch(videoListFailure());
            });
    };
}

export function videoList() {
    return {
        type: VIDEO_LIST
    };
}

export function videoListSuccess(data) {
    return {
        type: VIDEO_LIST_SUCCESS,
        data,
    };
}

export function videoListFailure() {
    return {
        type: VIDEO_LIST_FAILURE
    };
}
