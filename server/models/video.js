import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

var connection = mongoose.createConnection("mongodb://localhost:27017/invitation");
 
autoIncrement.initialize(connection);

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
Video.plugin(autoIncrement.plugin, 'video');
export default mongoose.model('video', Video);