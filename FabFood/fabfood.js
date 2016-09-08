var express = require('express');
var http=require('http');
var app = express();
var path=require('path');
 var cookieParser = require('cookie-parser');
// var mongojs = require('mongojs');
// var db = mongojs('customer', ['customer']);
var morgan      = require('morgan');
var bodyParser = require('body-parser');
var mongoose    = require('mongoose');

var passport	= require('passport');
// var config      = require('./config/database'); // get db config file
// var users        = require('./app/models/user'); // get the mongoose model
// var jwt         = require('jwt-simple');
var expressValidator = require('express-validator');
// var flash = require('connect-flash');
 var session = require('express-session');
var hash = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
  
    mongoose.connect('mongodb://localhost/fabfooduser');
    var db = mongoose.connection;
     

     var User = require('./app/models/user.js');

     var routes = require('./routes/api.js');


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
      app.use(cookieParser());



    app.use(express.static(path.join(__dirname , '/public')));
    app.use(morgan('dev'));

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(cookieParser());

    app.use(require('express-session')({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, 'public')));

    // configure passport
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());




      
    app.use('/api', require('./routes/routes'));


    	
    	app.use('/user', routes);
    	
    	app.get('/',function(req,res){
    	 res.sendFile('index.html');
    	//   //It will find and locate index.html from View or Scripts
    	 });

    	
    app.use(function(req, res, next) {
      var err = new Error('Not Found till now');
      err.status = 404;
      console.log(err.status);
      next(err);
    });

    app.use(function(err, req, res) {
      res.status(err.status || 500);
      res.end(JSON.stringify({
        message: err.message,
        error: {}
      }));
    });

    module.exports = app;




    app.listen(3000);
    console.log("3 server running  port 3000"); 