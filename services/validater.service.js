const express = require('express');

var service = {
  validateUsername: validateUsername
}
module.exports = service;

function validateUsername(username, type) {
  if(type == "mail"){
    if(username.endsWith('@gmail.com')){
      return true;
    }else{
      return false;
    }
  }else if(type == "phone"){
    console.log(typeof username);
    var regx = new RegExp('^[0-9]{10}$');
    console.log(regx);
    console.log(regx.test(username), "is valid");
    if(!!username && regx.test(username)){
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
}