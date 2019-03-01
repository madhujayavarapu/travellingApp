const express = require('express');

var service = {
  validateUsername: validateUsername
}
module.exports = service;

function validateUsername(username, type) {
  var mobileRegx = new RegExp('^[0-9]{10}$');
  var mailRegx = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$');
  var regx = type == "mail" ? mailRegx : mobileRegx;
  return (!!username && regx.test(username)) ? true : false;
}