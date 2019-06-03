const express = require('express');
var router = express.Router();

const userSrv = require('../services/user.service');
const busSrv = require('../services/busroutes.service');
const ticketSrv = require('../services/ticket.service');
// const paytm = require('../services/paymentservice');

// Auth routes
router.post('/verifyUsername', userSrv.verifyUsername);
router.post('/validateOtp', userSrv.validateOTP);
router.post('/authenticateUser', userSrv.authenticateUser);
router.post('/getUserInfo', userSrv.getUserInfo);
router.post('/createUser', userSrv.insertuser);

// Bus Routes
router.post('/addBusDetails', busSrv.addBusDetails);
router.post('/addPriceDetailsForRoute', busSrv.addPriceDetailsForRoute);

router.get('/getAllRoutes', busSrv.getAllRoutes);
router.post('/getBusDetails', busSrv.getBusDetails);
router.post('/getBoardingPoints', busSrv.getBoardingPoints);
router.post('/getDroppingPoints', busSrv.getDroppingPoints);
router.post('/getFareDetailsForTrip', busSrv.getFareDetailsForTrip);
// router.post('/checksumpayment', paytm.generatechecksumpayment);

// Ticket Routes
router.post('/bookTicket', ticketSrv.bookTicket);
router.post('/getAllTicketsOfUser', ticketSrv.getAllTicketsOfUser);

module.exports = router;
