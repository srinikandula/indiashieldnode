const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;
const userSchema = mongoose.Schema({
    phonenumber: { 
        type: Number, 
        required: true, 
        unique: true, 
    },
    signup: {
        type: Boolean,
        default: false
    }
}, { strict: false });

module.exports = mongoose.model('User', userSchema);