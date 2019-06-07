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

/**
 * VIDEO UPLOAD : POST /api/video
 * BODY SAMPLE { filename: '1558936589438.jpg',
                path: 'uploads\\username\\1558936589438.jpg',
                originalname: '2.jpg',
                size: 83558,
                username: 'test', 
                enterid: 'test'}
 * ERROR CODES
 *      1: BAD USERNAME
 *      2: EMPTY CONTENTS
 *      3: BAD PASSWORD
 */
// router.post('/', (req, res, next) => {
    
//     upload(req, res, function (err) {
//         if (err) {
//             winston.error(err);
//             return res.status(500).json({
//                 error: err
//             });
//         }
//         console.log(req.files);
//         winston.log('info', JSON.stringify(req.files));

//         for (let value of req.files) {

//             // CREATE NEW MEMO
//             let video = new Video({
//                 filename: value.filename,
//                 path: value.path,
//                 originalname: value.originalname,
//                 size: value.size,
//                 username: 'test',
//                 enterid: 'test',
//                 invitee: req.body.invitee
//             });

//             // SAVE IN DATABASE
//             video.save(err => {
//                 if (err) throw err;
//             });
//         }
//         return res.json({ success: true });
//     })
// });
router.post('/', (req, res, next) => {
    
    upload(req, res, function (err) {
        if (err) {
            winston.error(err);
            return res.status(500).json({
                error: err
            });
        }
        console.log(req.files);
        winston.log('info', JSON.stringify(req.files));
        
        let filePath ='';
        for (let value of req.files) {
            filePath = value.path;

        }
        return res.json({ filePath : filePath });
    })
});

/**
 * READ ADDITIONAL (OLD/NEW) MEMO: GET /api/memo/:listType/:id
 */
router.get('/:username/:uploadFlag', (req, res) => {
    let username = req.params.username;
    let uploadFlag = req.params.uploadFlag;
    // GET IMAGE LIST
    Image.find({ username: username, uploadflag: uploadFlag })
        .sort({ 'originalname': 1 })
        //.limit(6)
        .exec((err, image) => {
            if (err) throw err;
            return res.json(image);
        });

});

/**
 * DELETE Video : DELETE /api/image/
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