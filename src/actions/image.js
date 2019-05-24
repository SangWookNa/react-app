import {
    IMAGE_UPLOAD, 
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAILURE
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
