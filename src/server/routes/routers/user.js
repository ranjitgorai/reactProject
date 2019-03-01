"use strict"

var express = require('express')
var router = express.Router()

var controller = require('../controllers/user')

router.post('/signupUser',controller.signupUser);

module.exports = router;