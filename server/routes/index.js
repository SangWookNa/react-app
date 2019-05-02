import express from 'express';
import os from 'os';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

// if you need api routes add them here
router.get("/getUsername", function(req, res, next){
    res.send({ username: os.userInfo().username });
});



export default router;