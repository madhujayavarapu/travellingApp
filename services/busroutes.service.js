const express = require('express');
const mongoose = require('mongoose');
const models = require('../models/busdetails');
var service = {
    getmainroutes: getmainroutes,
    getbusroutedetails:getbusroutedetails,
    getbusprice:getbusprice
}
module.exports = service;
function getmainroutes(req,res,next){
    models.mainbusroute.find({},(err,result) =>{
      if(err){
        console.log(err);
      }else{
        res.json(result);
      }

    })

}

function getbusroutedetails(req,res,next){

    models.busroutedetail.find({bustype:req.body.bustype},{routes:1,_id:0},(err,result) =>{
      if(err){
        console.log(err);
      }else{
        if(result[0].routes)
         res.json(result[0].routes);
        else
         res.json({});
      }

    })

}

function getbusprice(req,res,next) {
  models.buspricedetail.find({from:req.body.from,to:req.body.to,busnumber:req.body.busnumber},{_id:0,from:0,to:0},(err,result) =>{
    if(err){
      console.log(err);
    }else{
      res.json(result[0]);
    }

  })
}
