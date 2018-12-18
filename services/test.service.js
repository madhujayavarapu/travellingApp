const express = require('express');

var service = {
    testService: testService
}

module.exports = service;

function testService(req, res, next){
    res.json({success: true, msg: "Ok it's working"});
}