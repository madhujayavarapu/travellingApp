var express = require('express');
var router = express.Router();
const Userservice = require('../services/user.service');
/* GET users listing. */
router.post('/createuser',Userservice.insertuser);

module.exports = router;
