const express = require('express');
const router = express.Router();

// Services
const testSrv = require('../services/test.service');

router.get('/test',testSrv.testService);

module.exports = router;