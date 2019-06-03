const express = require('express');
const mongoose = require('mongoose');
const models = require('../models/busdetails');
var service = {
    // getmainroutes: getmainroutes,
    // getbusroutedetails:getbusroutedetails,
    // getbusprice:getbusprice
    getAllRoutes: getAllRoutes,
    addBusDetails: addBusDetails,
    addPriceDetailsForRoute: addPriceDetailsForRoute,
    getBoardingPoints: getBoardingPoints,
    getDroppingPoints: getDroppingPoints,
    getBusDetails: getBusDetails,
    getFareDetailsForTrip: getFareDetailsForTrip
}
module.exports = service;
// function getmainroutes(req,res,next){
//     models.mainbusroute.find({},(err,result) =>{
//       if(err){
//         console.log(err);
//       }else{
//         res.json({status: true, data: result});
//       }
//     })
// }

// function getbusroutedetails(req,res,next){
//   models.busroutedetail.find({bustype:req.body.bustype},{routes:1,_id:0},(err,result) =>{
//     if(err){
//       console.log(err);
//     }else{
//       if(result[0].routes)
//         res.json(result[0].routes);
//       else
//         res.json({});
//     }
//   })
// }

// function getbusprice(req,res,next) {
//   models.buspricedetail.find({from:req.body.from,to:req.body.to,busnumber:req.body.busnumber},{_id:0,from:0,to:0},(err,result) =>{
//     if(err){
//       console.log(err);
//     }else{
//       res.json(result[0]);
//     }
//   })
// }

function getAllRoutes(req, res, next) {
  models.BusDetails.distinct('route', (err, routes) => {
    if(err){
      res.json({status: false, msg: 'Something went wrong', error: err});
    }else{
      if(routes){ 
        res.json({status: true, data: routes});
      }else{
        res.json({status: false, msg: 'Failed to fetch routes.'});
      }
    }
  })
}

function getBusDetails(req, res, next) {
  models.BusDetails.find({route: req.body.route, bus_number: req.body.busNumber}, (err, busDetails) => {
    if(err){
      res.json({status: false, msg: "Something went wrong", error: err});
    }else if(!!busDetails && busDetails.length > 0) {
      res.json({status: true, data: busDetails})
    }else{
      res.json({status: false, msg: "Not found Bus with Bus number "+req.body.busNumber});
    }
  })
}

function addBusDetails(req, res, next) {
  let newBusDetails = new models.BusDetails({
    route: req.body.route,
    stops: req.body.stops,
    // dropping_points: req.body.droppingPoints,
    bus_type: req.body.busType,
    bus_number: req.body.busNumber,
    num_of_seats: req.body.numOfSeats
  });
  newBusDetails.save((err, isSaved) => {
    if(err){
      res.json({status: false, msg: 'Something went wrong', error: err});
    }else if(isSaved) {
      res.json({status: true, msg: 'New Bus details added to DB'});
    }else{
      res.json({status: false, msg: 'Failed to add bus Details'});
    }
  });
}

function addPriceDetailsForRoute(req, res, next) {
  let route = req.body.route || null;
  let boardingPoint = req.body.boardingPoint || null;
  let droppingPoint = req.body.droppingPoint || null;
  let price = req.body.price;

  price.halfTicketPrice = price.halfTicketPrice || null;
  price.fullTicketPrice = price.fullTicketPrice || null;
  price.seniorCitizenPrice = price.seniorCitizenPrice || null;

  if(!!boardingPoint && !!droppingPoint && !!price && !!route){
    let query = {boarding_point: boardingPoint, dropping_point: droppingPoint, route: route};
    models.PriceDetails.find(query, (err, priceDetails) => {
      if(err){
        res.json({status: false, msg: 'Something went wrong', error: err});
      }else if(priceDetails.length > 0){
        models.PriceDetails.findOneAndUpdate(query, {$set: {price: price}}, (err, isUpdated) => {
          if(err){
            res.json({status: false, msg: 'Something went wrong', error: err});
          }else if(isUpdated){
            res.json({status: true, msg: 'Price Details updated successfully'});
          }else{
            res.json({status: false, msg: 'Failed to update price details..please try again'});
          }
        })
      }else{
        let newPriceDetails = new models.PriceDetails({
          route: route,
          boarding_point: boardingPoint,
          dropping_point: droppingPoint,
          price: price
        })
        newPriceDetails.save((err, isSaved) => {
          if(err){
            res.json({status: false, msg: 'Something went wrong', error: err});
          }else if(!!isSaved){
            res.json({status: true, msg: 'Price Details saved successfully'});
          }else{
            res.json({status: false, msg: 'Failed to save price details..please try again'});
          }
        })
      }
    })
  }else{
    res.json({status: false, msg: 'Request format wrong'});
  }
}

function getBoardingPoints(req, res, next) {
  let route = req.body.route;
  let busNumber = req.body.busNumber;
  // query
  let query = {route: route, bus_number: busNumber};

  models.BusDetails.find(query, {stops: 1, _id:0}, (err, busDetails) => {
    if(err){
      res.json({status: false, msg: "something went wrong", error: err});
    }else if(busDetails.length > 0){
      res.json({status: true, msg: "bus details found", data: busDetails[0].stops.slice(0, -1)});
    }else{
      res.json({status: false, msg: 'failed to fetch bus details..check the bus number and try again'});
    }
  })
}

function getDroppingPoints(req, res, next) {
  let route = req.body.route;
  let busNumber = req.body.busNumber;
  let boardingPoint = req.body.boardingPoint;

  let query = {route: route, bus_number: busNumber};
  models.BusDetails.find(query, {stops: 1}, (err, busDetails) => {
    if(err){
      res.json({status: false, msg: "something went wrong", error: err});
    }else if(busDetails.length > 0){
      res.json({status: true, msg: "bus details found",
       data: busDetails[0].stops.slice(busDetails[0].stops.indexOf(boardingPoint)+1)});
    }else{
      res.json({status: false, msg: 'failed to fetch bus details..check the bus number and try again'});
    }
  })
}

function getFareDetailsForTrip(req, res, next) {
  let route = req.body.route;
  let boardingPoint = req.body.boardingPoint;
  let droppingPoint = req.body.droppingPoint;

  let query = {route: route, boarding_point: boardingPoint, dropping_point: droppingPoint};
  
  models.PriceDetails.find(query, (err, priceDetails) => {
    if(err){
      res.json({status: false, msg: 'Something went wrong', error: err});
    }else if(priceDetails.length > 0){
      res.json({status: true, msg: "price was: ", data: priceDetails[0].price});
    }else{
      res.json({status: false, msg: 'Failed to get the price for the route'});
    }
  })
}