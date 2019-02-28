const express = require('express');
var router = express.Router();

const validater = require('../services/validater.service');
const userSrv = require('../services/user.service');

router.post('/verifyUsername', userSrv.verifyUsername);
router.post('/validateOtp', userSrv.validateOTP);

module.exports = router;