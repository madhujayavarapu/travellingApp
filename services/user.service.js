const express = require('express');
const models = require('../models/user');
const validater = require('./validater.service');
const utils = require('./utils.service');
const moment = require('moment');
const projConstants = require('../constants/proj.constant');

var service = {
    insertuser: insertuser,
    verifyUsername: verifyUsername,
    validateOTP: validateOTP,
    authenticateUser: authenticateUser
}

module.exports = service;

function authenticateUser(req, res, next) {
  let { username, password } = req.body;
  if(!!username && !!password){
    models.User.find({username: username, password: password}, (err, isValidUser) => {
      if(err){
        res.json({status: false, msg: 'Something went Wrong', error: err});
      }else if(isValidUser.length > 0){
        // need to send token here.
        let {username, name, _id} = isValidUser[0];
        res.json({status: true, user: {username, name, _id}});
      }else{
        res.json({status: false, msg: 'Invalid Credentials'});
      }
    })
  }
}

function verifyUsername(req, res, next) {
  let username = req.body.username;
  let usernameType = req.body.usernameType;
    if(!!username && validater.validateUsername(username, usernameType)){
    let otp = utils.generateOtp(6, false, false, false);
    let otpservice = usernameType == 'mobile' ? utils.sendSms : utils.sendMail;
    var userdetailotp = new models.OtpUser({
      "username" : username,
      "otp" : otp,
      "timestamp" :  moment()
    });
    userdetailotp.save(userdetailotp, (err, isSaved) => {
      if(err)
        res.json({status: false, msg: 'Something went wrong while saving otp to db'});
      else if(isSaved){
        let result = otpservice(usernameType,username, otp);
        if(result){
          res.json({status: true, msg: 'OTP sent successfully..details saved in the collection'});
        }else{
          res.json({status: false, msg: 'Something went wrong while sending otp to your username'});
        }
      }
    })
  }else{
    res.json({status: false, message: 'Username is not valid'});
  }
}

function validateOTP(req, res, next) {
  let username = req.body.username;
  let enteredOtp = req.body.otp;
  models.OtpUser.findOne({username: username}, (err, userDetails) => {
    if(err){
      res.json({status: false, message: 'Some error came',error: err});
    }else if(userDetails != null && !!userDetails){
      if(enteredOtp === userDetails.otp){
        if(utils.diffBwTimestamps(userDetails.timestamp, moment(), 'minutes') <= projConstants.OTP_EXPIRE_TIME){
          res.json({status: true, message: 'valid otp and in time..vefied username'});
        }else{
          res.json({status: true, message: 'OTP time expired'});
        }
      }else{
        res.json({status: true, message: 'OTP is not valid'});
      }
    }else{
      res.json({status: false, message: 'user not found in db'});
    }
  })
}

function insertuser(req, res, next){
    var userdetail = new models.User({
      "username" : req.body.username,
      "password" : req.body.password,
      "name" : req.body.name,
      "gender":req.body.gender
    });
    models.User.findOne({username:req.body.username},(err,data) =>{
      if(err){
        console.log(err);
        res.json({status: false, message:'Something went wrong..please try again', error: err});
      }else{
        if(!data){
          userdetail.save(userdetail,(err,result) => {
            if(err){
                console.log(err);
            }else if(!!result){
              res.json({
                  status: true,
                  "msg": "User added successfully"
              })
            }
          })
        }else{
          res.json({
              status: false,
              "msg": "User Already Exists"
          })
        }
      }
    })
}
