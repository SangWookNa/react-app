import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    upload: {
        status: 'INIT',
        error: -1
    },
    galleryList: {
        status: 'INIT',
        data: [],
    },
    gridList: {
        status: 'INIT',
        data: [],
    },
    mainList: {
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
        case types.IMAGE_GALLERY_LIST:
            return update(state, {
                galleryList: {
                    status: { $set: 'WAITING' },
                }
            });
        case types.IMAGE_GALLERY_LIST_SUCCESS:
            return update(state, {
                galleryList: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                }
            })
        case types.IMAGE_GALLERY_LIST_FAILURE:
            return update(state, {
                galleryList: {
                    status: { $set: 'FAILURE' }
                }
            });
        case types.IMAGE_GRID_LIST:
            return update(state, {
                gridList: {
                    status: { $set: 'WAITING' },
                }
            });
        case types.IMAGE_GRID_LIST_SUCCESS:
            return update(state, {
                gridList: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                }
            })
        case types.IMAGE_GRID_LIST_FAILURE:
            return update(state, {
                gridList: {
                    status: { $set: 'FAILURE' }
                }
            });
        case types.IMAGE_MAIN:
            return update(state, {
                mainList: {
                    status: { $set: 'WAITING' },
                }
            });
        case types.IMAGE_MAIN_SUCCESS:
            return update(state, {
                mainList: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                }
            })
        case types.IMAGE_MAIN_FAILURE:
            return update(state, {
                mainList: {
                    status: { $set: 'FAILURE' }
                }
            });
        default:
            return state;

    }
}