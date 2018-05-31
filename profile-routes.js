const router = require('express').Router();
const Poll = require('./poll-model.js');
const mongoose = require('mongoose');

const authCheck = function(req, res, next) {
  if (!req.user) {
    //user not logged in
    res.redirect("/auth/login");
  } else {
    //user is logged in
    next(); //moves on to the callback in router.get()
  }
}

router.get("/", authCheck, function(req, res) {
  //look at the polls database and see if there are any attached to this user
  Poll.find({creator: req.user.id}, function(err, polls) {
    //pass these on below.
    res.render("profile", {user: req.user, polls: polls});
  });
});

router.get("/create", authCheck, function(req, res) {
  res.render("create", {user: req.user});
});

module.exports = router;