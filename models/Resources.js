const mongoose = require('mongoose');

ObjectId = mongoose.Schema.ObjectId;
const Resources = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please Enter a Name'],
        trim:true,
        maxlength:[50, 'Name can not be more than 50 characters'],
    },
    contactnumber:{
        type:Number,
        required: [true, 'Please Enter a Last Name'],
        trim:true,
        maxlength:[50, 'Last Name can not be more than 50 characters'],
    },
    phonenumber:{
        type:String,
        required: [true, 'Please Phone number'],
        trim:true,
        maxlength:[10, 'Phone number can not be more than 10 characters'],
    },
    message:{
        type:String,
        required: [true, 'Please Enter a Message'],
        trim:true,
    },
    createdAt: {
        type: Date,
        default: Date
    },
    verifiedon: {
        type: Date,
        default: Date
    },
    verifiedby:{
        type:String,
        required: [true, ''], 
    }
});



module.exports = mongoose.model('ContactUs', ContactUs);
