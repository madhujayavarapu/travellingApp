const express = require('express');
const models = require('../models/user');
var otpGenerator = require('otp-generator');
var nodemailer = require("nodemailer");
const validater = require('./validater.service');
const utils = require('./utils.service');

var service = {
    insertuser: insertuser,
    generateotp:generateotp,
    verifyUsername: verifyUsername,
    validateOTP: validateOTP
}

module.exports = service;

function verifyUsername(req, res, next) {
  let username = req.body.username;
  let usernameType = req.body.usernameType;
  if(!!username && validater.validateUsername(username, usernameType)){
    let otp = utils.generateOtp(6, false, false, false);

    // if(usernameType == 'mail'){
    //   let result = utils.sendSms('otp', username, otp);
    //   if(result) {
    //     res.json({status: true, message: 'OTP Sent to username'});
    //   }else {
    //     res.json({status: false, message: 'Failed to Send to SMS'});
    //   }
    // }else if(usernameType == 'phone') {
    //   let result = utils.sendMail('otp', username, otp);
    //   if(result) {
    //     res.json({status: true, message: 'OTP Sent to username'});
    //   }else {
    //     res.json({status: false, message: 'Failed to Send to OTP to Mail'});
    //   }
    }
    res.json({status: true, message: 'Ok Valid Username', otp: otp});
  }else{
    res.json({status: true, message: 'Username is not valid'});
  }
}

function validateOTP(req, res, next) {
  let username = req.body.username;
  let otp = req.body.otp;
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
      }else{
        if(!data){
          userdetail.save(userdetail,(err,result) => {
            if(err){
                console.log(err);
            }else{
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

function generateotp(req, res, next){
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false ,alphabets:false});
  const type = req.body.type;
    var generateotp = new models.OtpUser({
      "username" : req.body.username,
      "otp" : otp
    });
    models.OtpUser.findOne({username:req.body.username},(err,data) =>{
      if(err){
        console.log(err);
      }else{
        if(data){
          models.OtpUser.update({"username":req.body.username},{$set:{'otp':otp}},(err,result) => {
           if(err){
               console.log(err);
           }else{
             if(type === "email"){
             var smtpTransport = nodemailer.createTransport({
                service: "gmail",
                auth: { 
                    user: "SENDER_MAIL",
                    pass: "SENDER_MAIL_PASSWORD"
                }
             });
             smtpTransport.sendMail({
             from: "SENDER_MAIL", // sender address
             to: req.body.username, // comma separated list of receivers
             subject: "Testing sending using gmail", // Subject line
             text: otp // plaintext body
             }, function(error, response){
                 if(error){
                     console.log(error);
                 }else{
                   res.json({
                       status: true,
                       "msg": "otp send successfully"
                   })
                 }
             });
           }else{
             //for mobile otp code
           }
         }
         })
        }else{
          generateotp.save(generateotp,(err,result) => {
            if(err){
                console.log(err);
            }else{
                if(type === "email"){
                  var smtpTransport = nodemailer.createTransport({
                     service: "gmail",
                     auth: {
                         user: "",
                         pass: ""
                     }
                  });
                  smtpTransport.sendMail({
                  from: "biradaryogesh9@gmail.com", // sender address
                  to: req.body.username, // comma separated list of receivers
                  subject: "Testing sending using gmail", // Subject line
                  text: otp // plaintext body
                  }, function(error, response){
                      if(error){
                          console.log(error);
                      }else{
                        res.json({
                            status: true,
                            "msg": "otp send successfully"
                        })
                      }
                  });
               }else{
                 //for mobile otp
               }
             }
          })
        }
      }

    })

}
