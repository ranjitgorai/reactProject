var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
const http = require('http');

var config = require('./config')[process.env.NODE_ENV || 'development'];

var indexRouter = require('./routes/index');

var app = express();
 
 //mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database,{ useNewUrlParser: true, useCreateIndex: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database successfully connected!')
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: config.secret,
  resave: false,
  cookie: { secure: false },
  saveUninitialized: true
}));

app.use('/', indexRouter);

const port = process.env.PORT || config.apiPort;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on ${port}`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
