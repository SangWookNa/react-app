import Image from '../models/image';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import gm from 'gm';

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const dir = 'public/uploads/' + req.body.username + '/';
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, err => cb(err, dir))
            }
            cb(null, 'public/uploads/' + req.body.username + '/');
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
    //console.log(req.files);

    upload(req, res, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: err
            });
        }
        console.log(req.files);

        //섬네일 크기세팅
        for (let value of req.files) {
            let width = 0;
            let height = 0;
            if (req.body.uploadFlag === 'gallery') {
                width = 200;
                height = 200;
            } else if (req.body.uploadFlag === 'grid') {
                width = 200;
                height = 350;
            }

            //섬네일 생성
            gm(value.path)
                .thumb(width, height, `${value.destination}/${path.basename(value.filename, path.extname(value.filename))}_thumb${path.extname(value.filename)}`, function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: err
                        });
                    }

                });

            // CREATE NEW MEMO
            let image = new Image({
                filename: value.filename,
                path: value.path,
                thumbnailpath: `${value.destination}/${path.basename(value.filename, path.extname(value.filename))}_thumb${path.extname(value.filename)}`,
                originalname: value.originalname,
                size: value.size,
                username: 'test',
                enterid: 'test',
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

export default router;