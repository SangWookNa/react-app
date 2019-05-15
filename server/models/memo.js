import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Memo = new Schema({
    writer: String,
    password: String,
    contents: String,
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }
}, {
    usePushEach: true
  });

  // generates hash
  Memo.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, 8);
}

// compares the password
Memo.methods.validateHash = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('memo', Memo);