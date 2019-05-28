import Image from '../models/image';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const dir = 'public/uploads/' + req.body.test + '/';
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, err => cb(err, dir))
            }
            cb(null, 'public/uploads/' + req.body.test + '/');
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
                path: 'uploads\\test\\1558936589438.jpg',
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
        for (let value of req.files) {

            // CREATE NEW MEMO
            let image = new Image({
                filename: value.filename,
                path: value.path,
                originalname: value.originalname,
                size: value.size,
                username: 'test',
                enterid: 'test'
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
router.get('/:username', (req, res) => {
    let username = req.params.username;    
    
    // GET IMAGE LIST
    Image.find({ username:   username  })
        .sort({ 'originalname': 1 })
        //.limit(6)
        .exec((err, image) => {
            if (err) throw err;
            return res.json(image);
        });

});

export default router;