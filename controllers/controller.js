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


exports.verifyOTP = async (req,res,next) => {
    console.log(req.body);
    if(req.body.otp === '1234'){
        User.find({ phonenumber: req.body.phonenumber})
                .exec()
                .then(user => {
                    if(user.length < 1){
                        const username = User.create({"phonenumber":number, "signup" : false});
                        const token = jwt.sign({
                            phonenumber: username[0].phonenumber,
                            userId: username[0]._id
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
                            userId: username[0]._id,
                            signup: username[0].signup,
                            number: username[0].phonenumber
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
                        return res.status(200).json({
                            success: true,
                            message: 'Auth Successful !',
                            token: token,
                            userId: user[0]._id,
                            signup: user[0].signup,
                            number: user[0].phonenumber
                        })
                    }
                })
    }else{
        res.status(401).json({ success : false , data: "OTP Unverified !" });
    }
}

