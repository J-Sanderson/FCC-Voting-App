const router = require('express').Router();
const Poll = require('./poll-model.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const urlencodedParser = bodyParser.urlencoded({extended: false});

const authCheck = function(req, res, next) {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}

router.get("/create", authCheck, function(req, res) {
  res.render("create", {user: req.user});
});

router.post("/create", urlencodedParser, authCheck, function(req, res) {
  //handle post req from poll-client.js
  var optObj = {}; //this will hold the option/votes pairs
  //convert poll options to array
  var optArr = req.body.options.split(',').map(function(x){
    return x = x.replace(/^\s*|\s*$/g, ''); //stript leading/trailing whitespace
  })
  optArr.forEach(function(x){
    optObj[x] = 0;
  }); //add to object
  //create new database record for this poll
  new Poll({
    title: req.body.pollname,
    creator: req.user.id, //mongodb created id for user
    options: optObj, //actually an array with this inside
    voted: [] //remains empty until someone votes later
  }).save().then(function(newPoll){
    console.log(newPoll); //do more than this...
  });
});

module.exports = router;
