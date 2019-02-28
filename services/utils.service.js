const express = require('express');
const otpGenerator = require('otp-generator');

var service = {
  generateOtp: generateOtp,
  sendSms: sendSms,
  sendMail: sendMail
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

function sendSms(type, mobileNumber, content) {
  
}

function sendMail(type, mail, content) {

}