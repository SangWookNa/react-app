import {
    IMAGE_UPLOAD, 
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAILURE,
    IMAGE_GALLERY_LIST, 
    IMAGE_GALLERY_LIST_SUCCESS,
    IMAGE_GALLERY_LIST_FAILURE,
    IMAGE_GRID_LIST, 
    IMAGE_GRID_LIST_SUCCESS,
    IMAGE_GRID_LIST_FAILURE
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

/** IMAGE GALLERY LIST */
/*
    Parameter:        
        - username:  OPTIONAL; find image of following user
*/

export function imageGalleryListRequest(username, uploadFlag) {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(imageGalleryList());

        let url = `/api/image/${username}/${uploadFlag}`;

        return axios.get(url)
            .then((response) => {
                dispatch(imageGalleryListSuccess(response.data));
            }).catch((error) => {
                dispatch(imageGalleryListFailure());
            });
    };
}

export function imageGalleryList() {
    return {
        type: IMAGE_GALLERY_LIST
    };
}

export function imageGalleryListSuccess(data) {
    return {
        type: IMAGE_GALLERY_LIST_SUCCESS,
        data,
    };
}

export function imageGalleryListFailure() {
    return {
        type: IMAGE_GALLERY_LIST_FAILURE
    };
}

/** IMAGE GRID LIST */
/*
    Parameter:        
        - username:  OPTIONAL; find image of following user
*/

export function imageGridListRequest(username, uploadFlag) {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(imageGridList());

        let url = `/api/image/${username}/${uploadFlag}`;

        return axios.get(url)
            .then((response) => {
                dispatch(imageGridListSuccess(response.data));
            }).catch((error) => {
                dispatch(imageGridListFailure());
            });
    };
}

export function imageGridList() {
    return {
        type: IMAGE_GRID_LIST
    };
}

export function imageGridListSuccess(data) {
    return {
        type: IMAGE_GRID_LIST_SUCCESS,
        data,
    };
}

export function imageGridListFailure() {
    return {
        type: IMAGE_GRID_LIST_FAILURE
    };
}