var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fooddata = require('../app/models/fooddata');
 
  
  router.get('/lunch', function(req, res) {
    mongoose.model('fooddata').find(function(err, fooddatas) {
    	if (err)
        	res.send(err);
 			 res.json(fooddatas);
    });
  });

  router.get('/breakfast', function(req, res) {
    mongoose.model('breakfastdata').find(function(err, breakfastdatas) {
    	if (err)
        	res.send(err);
 			res.json(breakfastdatas);
    });
  });

  router.get('/dinner', function(req, res) {
    mongoose.model('dinnerdata').find(function(err, dinnerdatas) {
    	if (err)
        	res.send(err);
 			res.json(dinnerdatas);
    });
  });

  router.get('/dessert', function(req, res) {
    mongoose.model('dessertdata').find(function(err, dessertdatas) {
    	if (err)
        	res.send(err);
 			res.json(dessertdatas);
    });
  });
  router.get('/kidsspecial', function(req, res) {
    mongoose.model('kidsspecial').find(function(err, kidsspecials) {
      if (err)
          res.send(err);
       res.json(kidsspecials);
    });
  });

module.exports = router;
