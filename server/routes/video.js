import Video from '../models/video';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import winston from '../config/winston'

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            //const dir = 'public/uploads/video/' + req.body.username + '/';
            const dir = 'public/uploads/video/temp/';
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, err => cb(err, dir))
            }
            //cb(null, 'public/uploads/video/' + req.body.username + '/');
            cb(null, 'public/uploads/video/temp/');
        },
        filename: function (req, file, cb) {
            cb(null, crypto.randomBytes(18).toString('hex') + path.extname(file.originalname));
        }
    }),
    //limits: { fileSize: 5 * 1024 * 1024 }
}).array('file', 30);

router.post('/', (req, res, next) => {

    upload(req, res, function (err) {
        if (err) {
            winston.error(err);
            return res.status(500).json({
                error: err
            });
        }
        winston.log('info', JSON.stringify(req.files));

        return res.json({ files: req.files });
    })
});

/**
 * SAVE Video : SAVE /api/image/save
 * ERROR CODE
 */
router.post('/save', (req, res) => {

    let username = req.body.username;
    let invitee = req.body.invitee;
    let files = req.body.files;

    console.log(req.body);

    fs.rename(files[0].path, `public/uploads/video/${req.body.username}/${files[0].filename}`, function (err) {
        if (err) throw err;

        winston.log('info', `FILE MOVE : ${files[0].path} --> public/uploads/video/${req.body.username}/${files[0].filename}`);
    });

    // CREATE NEW MEMO
    let video = new Video({
        filename: files[0].filename,
        path: `public/uploads/video/${req.body.username}/${files[0].filename}`,
        originalname: files[0].originalname,
        size: files[0].size,
        username: username,
        enterid: username,
        invitee: invitee,
        
    });

    // SAVE IN DATABASE
    video.save((err, videos) => {
        if (err) throw err;

        res.json({ result: videos });
    });
    
});


/**
 * READ ADDITIONAL VIDEO: GET /api/video/:username/:invitee/:seq
 */
router.get('/:username/:invitee/:seq', (req, res) => {

    let username = req.params.username;
    let invitee = req.params.invitee;
    let seq = req.params.seq;

    if( invitee === '' || invitee === null || invitee === undefined || invitee === 'undefined' ){
        // GET IMAGE LIST 
        Video.find({ username: username, _id: seq })
        //.limit(6)
        .exec((err, video) => {
            if (err) throw err;
            return res.json(video);
        });
    }else{
        // GET IMAGE LIST 
        Video.find({ username: username, invitee: invitee, _id: seq })
        //.limit(6)
        .exec((err, video) => {
            if (err) throw err;
            return res.json(video);
        });
    }
});

/**
 * DELETE Video : DELETE /api/image/delete
 * ERROR CODE
 */
router.post('/delete', (req, res) => {
    let username = req.body.username;
    let invitee = req.body.invitee;

    console.log(req.body);

    Video.find({ username: username, invitee: invitee })
        .sort({ _id: -1 })
        .exec((err, memos) => {
            if (err) throw err;

            //REMOVE THE Video
            Video.remove({ username: username, invitee: invitee })
                .exec((err) => {
                    if (err) throw err;

                    for (let value of memos) {
                        fs.unlink(value.path, (err) => {
                            if (err) throw err;
                            winston.log('info', `${value.path} was deleted`);
                        });
                    }
                })
        });
    res.json({ success: true });
});

export default router;