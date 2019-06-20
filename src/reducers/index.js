import memo from './memo';
import image from './image';
import video from './video';

import { combineReducers } from 'redux';

export default combineReducers({
    memo, image, video
});