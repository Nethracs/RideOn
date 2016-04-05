var express = require('express');
var path = require('path');
var port     = process.env.PORT || 3000 ;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@jello.modulusmongo.net:27017/omo7jEju');
var passport = require('passport');

var model = require('./model/user');
var app = express();
var flash    = require('connect-flash');
// var routes = require('./routes/index')app, passport);


var session      = require('express-session');


var router = express.Router();
app.use(router);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('./controllers/user')(passport); 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/index')(app, passport); 

// app.use('/', routes);
// app.use('/home', routes);
// app.use('/about', routes);
// app.use('/clients', routes);
// app.use('/contact', routes);
// app.use('/portfolio', routes);
// app.use('/loggedin', routes);
// app.use('/team', routes)

var dropRestaurants = function(db, callback) {
   db.collection('restaurants').drop( function(err, response) {
      console.log(response)
      callback();
   });
};





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
console.log("We are inside this!!!");
console.log(router.stack);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
