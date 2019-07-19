import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Video = new Schema({
    filename: String,
    path: String,
    originalname: String,
    size : Number,
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false },
    username : String,
    invitee : String,
    enterid : String,
}, {
        usePushEach: true
    });

export default mongoose.model('video', Video);