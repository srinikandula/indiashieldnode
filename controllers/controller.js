const config = require('../config/config');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aync');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const db = new Schema({}, { strict: false });
const Resources = mongoose.model(config.mongo.database, db, 'resourcedata');
// var express = require('express');
// var router = express.Router();
// var request = require('request');
const User = require('../models/User');


// Add New Shipment
// exports.bookshipment = (async (req,res,next) => {
//     try{

//         let data = req.body;

//         const shipment =  await BookShipment.create(data);

//         res.status(201).json({
//             success:true,
//             data: shipment
//         }); 
//     }catch(err){
//         console.log(err);

//         if (err.name === 'ValidationError'){
//             const message = Object.values(err.errors).map(val => val.message);
//             error = new ErrorResponse(message, 400);
//             next(err);
//         }

//         // if(err.code === 11000){
//         //     console.log(err.message);
//         //     const message = 'Type Pair Is Already Exits!';
//         //     error = new ErrorResponse(message, 400);
//         //     next(err);
//         // }
//     } 
// });


// exports.contactus = (async (req,res,next) => {
//     try{

//         let data = req.body;

//         const contact =  await Contactus.create(data);

//         res.status(201).json({
//             success:true,
//             data: contact
//         }); 
//     }catch(err){
//         console.log(err);

//         if (err.name === 'ValidationError'){
//             const message = Object.values(err.errors).map(val => val.message);
//             error = new ErrorResponse(message, 400);
//             next(err);
//         }

//         // if(err.code === 11000){
//         //     console.log(err.message);
//         //     const message = 'Type Pair Is Already Exits!';
//         //     error = new ErrorResponse(message, 400);
//         //     next(err);
//         // }
//     } 
// });


// Search Api For Resources
exports.getresources = (async (req,res,next) => {
    const config = await Resources.find(req.query,{"_id":0});
res.status(200).json({ success : true ,count: config.length, data: config });
});

exports.getresourcesbylogin = (async (req,res,next) => {
    const config = await Resources.find(req.query);
res.status(200).json({ success : true ,count: config.length, data: config });
});

exports.sendOTP = (async (req,res,next) => {
    console.log(JSON.stringify(req.body));
    res.status(200).json({ success : true , data: "OTP SENT SUCCESSFULLY !" });
})

// Update User
exports.updateuser = (async (req,res,next) => {
    try{

        let data = req.body;
        let form = data.formdata;
        // var object = {};
        // data.formData.forEach((value, key) => object[key] = value);
        // var json = JSON.stringify(object);
        let user = await User.find({phonenumber: data.phonenumber});
        console.log(user[0]._id);
        let userdata = await User.findByIdAndUpdate(user[0]._id,form, {
            runValidators: true,
        });
        let userdata2 = await User.findByIdAndUpdate(user[0]._id, {"role" : data.role}, {
            runValidators: true,
        });
        let userdata3 = await User.findByIdAndUpdate(user[0]._id, {"signup": true},{
            runValidators: true, 
        })
        user = await User.find({phonenumber: data.phonenumber},{"_id":0});
        res.status(201).json({
            success:true,
            data: user
        }); 
    }catch(err){
        // console.log(err);

        if (err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new ErrorResponse(message, 400);
            next(err);
        }

        if(err.code === 11000){
            console.log(err.message);
            const message = 'Type Pair Is Already Exits!';
            error = new ErrorResponse(message, 400);
            next(err);
        }
    } 
});

exports.verifyresource = (async (req,res,next) => {
    try{
        let resourcedata = await Resources.findByIdAndUpdate(req.body.id,{"verifiedby" : req.body.verifyby, "verificationStatus" : "Verified", "verifiedon" : req.body.date}, {
            runValidators: true,
        });
        let resource = await Resources.find({_id: req.body.id});
        res.status(201).json({
            success:true,
            data: resource
        }); 
    }catch(err){
        // console.log(err);

        if (err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new ErrorResponse(message, 400);
            next(err);
        }

        if(err.code === 11000){
            console.log(err.message);
            const message = 'Type Pair Is Already Exits!';
            error = new ErrorResponse(message, 400);
            next(err);
        }
    } 
})

exports.verifyOTP = (async (req,res,next) => {
    let number = req.body.phonenumber;
    if(req.body.otp === '1234'){
        User.find({ phonenumber: number})
                .exec()
                .then((async (user) => {
                    if(user.length < 1){
                        const username = await User.create({"phonenumber": number, "signup" : false});
                        const token = jwt.sign({
                            phonenumber: username.phonenumber,
                            userId: username._id
                            },
                            config.jwt.secret, 
                            {
                           expiresIn: config.jwt.options.expiresIn
                            }
                        );
                        return res.status(200).json({
                            success: true,
                            message: 'Auth Successful !',
                            token: token,
                            userId: username._id,
                            signup: username.signup,
                            number: username.phonenumber,
                        })
                    }else{
                        const token = jwt.sign({
                            phonenumber: user[0].phonenumber,
                            userId: user[0]._id
                            },
                            config.jwt.secret, 
                            {
                           expiresIn: config.jwt.options.expiresIn
                            }
                        );
                        let data = user;
                        return res.status(200).json({
                            success: true,
                            message: 'Auth Successful !',
                            token: token,
                            userId: user[0]._id,
                            signup: user[0].signup,
                            number: user[0].phonenumber,
                            data: data
                        })
                    }
                }))
    }else{
        res.status(401).json({ success : false , data: "OTP Unverified !" });
    }
});

