var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/busroutes');
var usersRouter = require('./routes/users');
var cors = require('cors')
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// db config
const dbConfig = require('./config/database');
// DB connection
mongoose.connect(dbConfig.url,{useCreateIndex: true,useNewUrlParser: true});
const db = mongoose.connection;
// On connection
mongoose.connection.on('connected', () => {
    console.log("Database connected successfully "+dbConfig.url);
})
// On Error
mongoose.connection.on('error', (err) => {
    console.log("Database Error "+err);
})
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/api/user', usersRouter);
app.use('/api',routes);

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
