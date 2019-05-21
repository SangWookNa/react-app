import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * WRITE MEMO : POST /api/memo
 * BODY SAMPLE { contens: "sample"}
 * ERROR CODES
 *      1: BAD USERNAME
 *      2: EMPTY CONTENTS
 *      3: BAD PASSWORD
 */
router.post('/', (req, res) => {

    console.log(req.body);
    
    // CHECK USERNAME FORMAT
    let usernameRegex = /^[a-z0-9]+$/;

    if (typeof req.body.username !== 'string' || req.body.username === "") {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK PASS LENGTH
    if (req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 3
        });
    }

    // CREATE NEW MEMO
    let memo = new Memo({
        writer: req.body.username,
        password: req.body.password,
        contents: req.body.contents
    });

    memo.password = memo.generateHash(memo.password);
    // SAVE IN DATABASE
    memo.save(err => {
        if (err) throw err;
        return res.json({ success: true });
    });
    
});

/**
 * MODIFY MEMO: PUT /api/memo/:id
 * BODY SAMPLE: {contents: "sample"}
 * ERROR CODES
 *      1: INVALID ID,
 *      2: EMPTY CONTETNS
 *      3: NOT LOGGED IN
 *      4: NO RESOURCE
 *      5: PERMISSION FAILURE
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

    if (req.body.contetns === "") {
        return res.status(400).json({
            error: "EMPTY CONTETNS",
            code: 2
        });
    }

    //CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    //FIND MEMO
    Memo.findById(req.params.id, (err, memo) => {
        if (err) throw err;

        //IF MEMO DOES NOT EXIST
        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        //IF EXISTS, CHECK WRITER
        if (memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
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
 * DELETE MEMO : DELETE /api/memo/:id
 * ERROR CODE
 *      1: INVALID ID
 *      2: NOT LOGGED IN
 *      3: NO RESOURCE
 *      4: PERMISSION FAILURE
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

/**
 * TOGGLES STAR OF MEMO: POST /api/memo/star/:id
 * ERROR CODES
 *         1: INVALID ID
 *         2: NOT LOGGED IN
 *         3: NO RESOURCE
 */
router.post('/star/:id', (req, res) => {
    //CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    //CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    //FIND MEMO
    Memo.findById(req.params.id, (err, memo) => {
        if (err) throw err;

        //MEMO DOES NOT EXIST
        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        //GET INDEX OF USERNAME IN TH ARRAY
        let index = memo.starred.indexOf(req.session.loginInfo.username);

        //CHECK WHETHER THE USER ALREADY HAS GIVEN A STAR
        let hasStarred = (index === -1) ? false : true;

        if (!hasStarred) {
            //IF IT DOES NOT EXIST
            memo.starred.push(req.session.loginInfo.username);
        } else {
            //ALREADY starred
            memo.starred.splice(index, 1);
        }
        console.log(memo);
        // SAVE THE MEMO
        memo.save((err, memo) => {
            if (err) throw err;
            res.json({
                success: true,
                'has_starred': !hasStarred,
                memo
            });
        });

    });
})

/** READ MEMO OF A USER: GET /api/memo/:username */
router.get('/:username', (req, res) => {
    Memo.find({ writer: req.params.username })
        .sort({ "_id": -1 })
        .limit(6)
        .exec((err, memos) => {
            if (err) throw err;
            res.json(memos);
        });
});

/*
  READ ADDITIONAL (OLD/NEW) MEMO OF A USER: GET /api/memo/:username/:listType/:id
*/
router.get('/:username/:listType/:id', (req, res) => {
    let listType = req.params.listType;
    let id = req.params.id;

    //CHECK LIST TYPE VALIDITY
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

    let objId = new mongoose.Types.ObjectId(req.param.id);

    if (listType === 'new') {
        //GET NEWER MEMO
        Memo.find({ writer: req.params.username, _id: { $gt: objId } })
            .sort({ _id: -1 })
            .limit(6)
            .exec((err, memos) => {
                if (err) throw err;
                return res.json(memos);
            });
    } else {
        //GET OLDER MEMO
        Memo.find({ writer: req.params.username, _id: { $lt: objId } })
            .sort({ _id: -1 })
            .limit(6)
            .exec((err, memos) => {
                if (err) throw err;
                return res.json(memos);
            });
    }
});

export default router;


