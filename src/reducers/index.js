import memo from './memo';
import image from './image';
import video from './video';
import kakao from './kakao';
import userinfo from './userinfo';

import { combineReducers } from 'redux';

export default combineReducers({
    memo, image, video, kakao, userinfo
});