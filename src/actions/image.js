import {
    IMAGE_UPLOAD, 
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAILURE,
    IMAGE_LIST, 
    IMAGE_LIST_SUCCESS,
    IMAGE_LIST_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* IMAGE UPLOAD */
export function imageUploadRequest(file) {
    return (dispatch) => {
        //inform MEMO POST API is starting
        dispatch(imageUpload());

        return axios.post('/api/image/', { file })
            .then((response) => {
                dispatch(imageUploadSuccess());
            }).catch((error) => {
                dispatch(imageUploadFailure(error.response.data.code));
            });
    };
}

export function imageUpload() {
    return {
        type: IMAGE_UPLOAD
    };
}

export function imageUploadSuccess() {
    return {
        type: IMAGE_UPLOAD_SUCCESS
    };
}

export function imageUploadFailure(error) {
    return {
        type: IMAGE_UPLOAD_FAILURE,
        error
    };
}

/** IMAGE LIST */
/*
    Parameter:        
        - username:  OPTIONAL; find image of following user
*/

export function imageListRequest(username) {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(imageList());

        let url = `/api/image/${username}`;

        return axios.get(url)
            .then((response) => {
                dispatch(imageListSuccess(response.data));
            }).catch((error) => {
                dispatch(imageListFailure());
            });
    };
}

export function imageList() {
    return {
        type: IMAGE_LIST
    };
}

export function imageListSuccess(data) {
    return {
        type: IMAGE_LIST_SUCCESS,
        data,
    };
}

export function imageListFailure() {
    return {
        type: IMAGE_LIST_FAILURE
    };
}