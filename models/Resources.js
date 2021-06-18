const mongoose = require('mongoose');

ObjectId = mongoose.Schema.ObjectId;
const Resources = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please Enter a Name'],
        trim:true,
        maxlength:[50, 'Name can not be more than 50 characters'],
    },
    resource:{
        type:String,
        required: [true, 'Please Enter a Resource'],
        trim:true,
        maxlength:[50, 'Name can not be more than 50 characters'],
    },
    resourceName:{
        type:String,
        // required: [true, 'Please Enter a Resource Name'],
        trim:true,
        maxlength:[50, 'Name can not be more than 50 characters'],
    },
    city:{
        type:String,
        required: [true, 'Please Enter a City'],
        trim:true,
        maxlength:[50, 'Name can not be more than 50 characters'],
    },
    state:{
        type:String,
        required: [true, 'Please Enter a State'],
        trim:true,
        maxlength:[50, 'Name can not be more than 50 characters'],
    },
    contactNumber:{
        type:String,
        required: [true, 'Please Phone number'],
        trim:true,
        maxlength:[10, 'Phone number can not be more than 10 characters'],
    },
    address:{
        type:String
    },
    comments:{
        type:String
    },
    verificationStatus:{
        type:String,
        default: 'Unverified'
    },
    createdOn: {
        type: Date,
        default: Date
    },
    updatedOn: {
        type: Date,
        default: Date
    },
    verifiedOn: {
        type: Date,
    },
    createdBy: {
        type:String,
        required: [true, ''],
    },
    verifiedBy:{
        type:String,
        // required: [true, ''], 
    },
    updatedBy: {
        type:String,
        // required: [true, ''], 
    },
}, { strict: false });



module.exports = mongoose.model('ResourceData', Resources);
