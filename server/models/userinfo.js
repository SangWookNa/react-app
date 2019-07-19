import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserInfo = new Schema({
    enterid: String,
    groom: String,
    bride: String,
    groom_phone: String,
    bride_phone: String,
    addressName: String,
    road_address_name: String,
    address_name2: String,
    place_name: String,
    x : String,
    y : String,
    place_phone: String,
    etc : String,
    marry_date_time : Date,
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }
}, {
    usePushEach: true
  });


export default mongoose.model('userinfo', UserInfo);