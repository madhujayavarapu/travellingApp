const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    name : {
      type:String,
      required:true,
    },
    gender:{
      type:String,
      required:true
    }
});
const User =  mongoose.model('User',UserSchema);
const otpSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    otp: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

const OtpUser = module.exports = mongoose.model('OtpUser',otpSchema);

module.exports = {
    User: User,
    OtpUser:OtpUser
}
