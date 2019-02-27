const express = require('express');
const models = require('../models/user');
var otpGenerator = require('otp-generator');
var nodemailer = require("nodemailer");
var service = {
    insertuser: insertuser,
    generateotp:generateotp
}

module.exports = service;

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
                    user: "biradaryogesh9@gmail.com",
                    pass: "9742143009"
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
