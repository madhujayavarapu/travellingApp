const express = require('express');
var router = express.Router();

const userSrv = require('../services/user.service');
const busSrv = require('../services/busroutes.service');

// Auth routes
router.post('/verifyUsername', userSrv.verifyUsername);
router.post('/validateOtp', userSrv.validateOTP);
router.post('/authenticateUser', userSrv.authenticateUser);

// Bus Routes
router.post('/addBusDetails', busSrv.addBusDetails);
router.post('/addPriceDetailsForRoute', busSrv.addPriceDetailsForRoute);

router.get('/getAllRoutes', busSrv.getAllRoutes);
router.post('/getBusDetails', busSrv.getBusDetails);
router.post('/getBoardingPoints', busSrv.getBoardingPoints);
router.post('/getDroppingPoints', busSrv.getDropptingPoints);
router.post('/getFareDetailsForTrip', busSrv.getFareDetailsForTrip);

module.exports = router;