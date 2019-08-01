import express from 'express';
import UserInfo from '../models/userinfo';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * 
 */
router.post('/', (req, res) => {

    console.log(req.body);
    console.log(typeof req.body.data.userid);

    if (typeof req.body.data.userid !== 'number' || req.body.data.userid === "") {
        return res.status(400).json({
            error: "BAD USERID",
            code: 1
        });
    }

    // CREATE NEW UserInfo
    let userinfo = new UserInfo({

        enterid: req.body.data.userid,
        groom: req.body.data.groom,
        bride: req.body.data.bride,
        groom_phone: req.body.data.groomPhone,
        bride_phone: req.body.data.bridePhone,
        addressName: req.body.data.addressName,
        road_address_name: req.body.data.roadAddressName,
        address_name2: req.body.data.addressName2,
        place_name: req.body.data.placeName,
        x: req.body.data.x,
        y: req.body.data.y,
        place_phone: req.body.data.phone,
        marry_date_time: req.body.data.marryDateTime,
        etc: req.body.data.etc,

    });

    // SAVE IN DATABASE
    userinfo.save(err => {
        if (err) throw err;
        return res.json({ success: true });
    });
});


/* */
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    UserInfo.findOne({ enterid: req.params.id })
        .exec((err, userinfos) => {
            if (err) throw err;

            console.log(userinfos);
            res.json(userinfos);
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

export default router;



