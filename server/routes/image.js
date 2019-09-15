import Image from '../models/image';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import gm from 'gm';
import winston from '../config/winston'

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const dir =  'uploads/image/' + req.body.enterid + '/';
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, err => {
                    if (err) throw err;
                    cb(null, dir);
                })
            } else {
                cb(null, dir);
            }
        },
        filename: function (req, file, cb) {
            cb(null, crypto.randomBytes(18).toString('hex') + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
}).array('file', 30);

/**
 * WRITE MEMO : POST /api/image
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
router.post('/', (req, res, next) => {

    upload(req, res, function (err) {
        if (err) {
            winston.error(err);
            return res.status(500).json({
                error: err
            });
        }
        winston.log('info', JSON.stringify(req.files));

        //섬네일 크기세팅
        for (let value of req.files) {
            //console.log(value);
            let width = 0;
            let height = 0;
            if (req.body.uploadFlag === 'gallery') {
                width = 300;
                height = 300;
            } else if (req.body.uploadFlag === 'grid') {
                width = 400;
                height = 400;
            }

            if (req.body.uploadFlag !== 'main') {
                //섬네일 생성
                gm(value.path)
                    .thumb(width, height, `${value.destination}${path.basename(value.filename, path.extname(value.filename))}_thumb${path.extname(value.filename)}`, (err) => {
                        if (err) {
                            winston.error(err);
                            return res.status(500).json({
                                error: err
                            });
                        }
                    });
            }

            // CREATE NEW MEMO
            let image = new Image({
                filename: value.filename,
                path: value.path,
                thumbnailpath: `${value.destination}${path.basename(value.filename, path.extname(value.filename))}_thumb${path.extname(value.filename)}`,
                originalname: value.originalname,
                size: value.size,
                username: req.body.username,
                enterid: req.body.enterid,
                uploadflag: req.body.uploadFlag
            });

            // SAVE IN DATABASE
            image.save(err => {
                if (err) throw err;
            });
        }
        return res.json({ success: true });
    })
});

/**
 * READ ADDITIONAL (OLD/NEW) MEMO: GET /api/memo/:listType/:id
 */
router.get('/:enterid/:uploadFlag', (req, res) => {
    let enterid = req.params.enterid;
    let uploadFlag = req.params.uploadFlag;
    // GET IMAGE LIST
    Image.find({ enterid: enterid, uploadflag: uploadFlag })
        .sort({ 'originalname': 1 })
        //.limit(6)
        .exec((err, image) => {
            if (err) throw err;
            return res.json(image);
        });

});

/**
 * DELETE IMAGE : DELETE /api/image/
 * ERROR CODE
 */
router.delete('/:enterid/:uploadFlag', (req, res) => {
    let enterid = req.params.enterid;
    let uploadFlag = req.params.uploadFlag;

    Image.find({ enterid: enterid, uploadflag: uploadFlag })
        .sort({ _id: -1 })
        .exec((err, memos) => {
            if (err) throw err;

            //REMOVE THE IMAGE
            Image.remove({ enterid: enterid, uploadflag: uploadFlag })
                .exec((err) => {
                    if (err) throw err;

                    for (let value of memos) {
                        fs.unlink(value.path, (err) => {
                            if (err) throw err;
                            winston.log('info', `${value.path} was deleted`);
                        });
                        fs.unlink(value.thumbnailpath, (err) => {
                            if (err) throw err;
                            winston.log('info', `${value.thumbnailpath} was deleted`);
                        });

                    }
                })
        });
    res.json({ success: true });
});

export default router;