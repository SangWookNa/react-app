import express from 'express';
import UserInfo from '../models/userinfo';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * 
 */
router.post('/', (req, res) => {

    // if (typeof req.body.username !== 'string' || req.body.username === "") {
    //     return res.status(400).json({
    //         error: "BAD USERNAME",
    //         code: 1
    //     });
    // }

    // // CHECK CONTENTS VALID
    // if (typeof req.body.contents !== 'string') {
    //     return res.status(400).json({
    //         error: "EMPTY CONTENTS",
    //         code: 2
    //     });
    // }

    // if (req.body.contents === "") {
    //     return res.status(400).json({
    //         error: "EMPTY CONTENTS",
    //         code: 2
    //     });
    // }

    // // CHECK PASS LENGTH
    // if (typeof req.body.password !== "string" || req.body.password === "") {
    //     return res.status(400).json({
    //         error: "BAD PASSWORD",
    //         code: 3
    //     });
    // }

    // CREATE NEW UserInfo
    let userinfo = new UserInfo({

        enterid: req.body.enterid,
        groom: req.body.groom,
        bride: req.body.bride,
        groom_phone: req.body.groom_phone,
        bride_phone: req.body.bride_phone,
        addressName: req.body.addressName,
        road_address_name: req.body.road_address_name,
        address_name2: req.body.address_name2,
        place_name: req.body.place_name,
        x : req.body.x,
        y : req.body.y,
        place_phone: req.body.place_phone,
        etc : req.body.etc,

    });

    // SAVE IN DATABASE
    userinfo.save(err => {
        if (err) throw err;
        return res.json({ success: true });
    });
    
});

/**
 * 
 */
router.put('/:id', (req, res) => {

    //CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    //CHECK CONTETNS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTETNS",
            code: 2
        })
    }

    if (req.body.contents.trim() === "") {
        return res.status(400).json({
            error: "EMPTY CONTETNS",
            code: 2
        });
    }

    //FIND MEMO
    Memo.findById(req.params.id, (err, memo) => {
        if (err) throw err;

        //IF MEMO DOES NOT EXIST
        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        //MODIFY AND SAVE IN DATABASE
        memo.contents = req.body.contents;

        memo.date.edited = new Date();
        memo.is_edited = true;

        memo.save((err, memo) => {
            if (err) throw err;
            return res.json({
                success: true,
                memo
            })
        })
    })

});

/**
 * 
 */
router.delete('/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    //FIND MEMO AND CHECK FOR WRITER
    Memo.findById(req.params.id, (err, memo) => {
        if (err) throw err;

        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }        

        //REMOVE THE MEMO
        Memo.remove({ _id: req.params.id }, err => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

/**
 * READ MEMO : GET /api/memo
 */
router.get('/', (req, res) => {
    Memo.find()
        .sort({ "_id": -1 })
        //.limit(6)
        .exec((err, memos) => {
            if (err) throw err;
            res.json(memos);
        });
});

/**
 * READ ADDITIONAL (OLD/NEW) MEMO: GET /api/memo/:listType/:id
 */
router.get('/:listType/:id', (req, res) => {
    let listType = req.params.listType;
    let id = req.params.id;

    // CHECK LIST TYPE VALIDITY
    if (listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }

    // CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    if (listType === 'new') {
        // GET NEWER MEMO
        Memo.find({ _id: { $gt: objId } })
            .sort({ _id: -1 })
            .limit(6)
            .exec((err, memos) => {
                if (err) throw err;
                return res.json(memos);
            });
    } else {
        // GET OLDER MEMO
        Memo.find({ _id: { $lt: objId } })
            .sort({ _id: -1 })
            .limit(6)
            .exec((err, memos) => {
                if (err) throw err;
                return res.json(memos);
            });
    }

});



/* */
router.get('/:id', (req, res) => {
    Memo.find({ enterid: req.params.id })
        .sort({ "_id": -1 })
        //.limit(6)
        .exec((err, memos) => {
            if (err) throw err;
            res.json(memos);
        });
});

export default router;



