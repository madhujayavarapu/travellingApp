const express = require('express');
const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");
const moment = require('moment');
var Client = require('node-rest-client').Client;
var client = new Client();

var projConstants = require('../constants/proj.constant');

var service = {
  generateOtp: generateOtp,
  sendSms: sendSms,
  sendMail: sendMail,
  getServerTime: getServerTime,
  diffBwTimestamps: diffBwTimestamps
}
module.exports = service;

function generateOtp(length, isUppercase, isAlphabates, isSpecialChars) {
  let uppercase = !!isUppercase ? isUppercase : false;
  let special = !!isSpecialChars ? isSpecialChars : false;
  let alphabates = !!isAlphabates ? isAlphabates : false;
  let otpLength = !!length ? length : 6;
  const otp = otpGenerator.generate(otpLength, {upperCase: uppercase, specialChars: special ,alphabets: alphabates});
  return otp;
}

function sendSms(type, mobileNumber, otp) {
  client.get("http://198.15.103.106/API/pushsms.aspx?loginID="+projConstants.SMS_LOGIN_ID+"&password="+projConstants.SMS_PASSWORD+"&mobile="+mobileNumber+"&text=Please find your requested OTP is :"+otp+"&senderid=DEMOOO&route_id=1&Unicode=0", function (data, response) {
  });
  return true;
}

function sendMail(type,email,otp) {
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: projConstants.SENDER_MAIL,
        pass: projConstants.SENDER_MAIL_PASSWORD
    }
  });
  smtpTransport.sendMail({
  from: projConstants.SENDER_MAIL, // sender address
  to: email, // comma separated list of receivers
  subject: "Please don't share your OTP", // Subject line
  text: "Your OTP is : "+otp // plaintext body
  }, function(error, response){
      if(error){
          console.log(error);
          return false;
      }else{
        // res.json({
        //     status: true,
        //     "msg": "otp send successfully"
        // })
        return true;
      }
  });
  return true;
}

function getServerTime() {
  return moment();
}

function diffBwTimestamps(timestamp1, timestamp2, diffUnits) {
  let units = !!diffUnits ? diffUnits : 'minutes';
  let duration = moment.duration(timestamp2.diff(timestamp1));
  return duration.as(units);
}
