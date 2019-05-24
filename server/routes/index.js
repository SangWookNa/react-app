import express from 'express';
import memo from './memo';
import image from './image';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

router.use('/memo',memo);
router.use('/image',image);



export default router;