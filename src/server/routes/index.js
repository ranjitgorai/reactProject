var express = require('express');
var router = express.Router();

/* Middlewares */
router.use(function(req, res, next) {   //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.use('/user', require('./routers/user'))


module.exports = router;
