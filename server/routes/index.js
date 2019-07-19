import express from 'express';
import memo from './memo';
import image from './image';
import video from './video';
import kakao from './kakao';
import userinfo from './userinfo';
import winston from '../config/winston';

const router = express.Router();

router.use('/*', (req, res, next) => {
    if (res.statusCode !== 304) {
        winston.log('info', `PARAM ${JSON.stringify(req.params)} | BODY ${JSON.stringify(req.body)}`);
    }
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

router.use('/memo', memo);
router.use('/image', image);
router.use('/video', video);
router.use('/kakao', kakao);
router.use('/userinfo', userinfo);


export default router;