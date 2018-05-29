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
  //console.log("poll created"); //temp, just testing it works...
  //console.log(req.body); //details of poll
  //console.log(req.user); //user object - will need to create poll record
  //create new database record for this poll
  new Poll({
    title: req.body.pollname,
    creator: req.user.id //mongodb created id for user
  }).save();
});

module.exports = router;
