const router = require('express').Router();
const Poll = require('./poll-model.js');

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
  res.render("profile", {user: req.user});
});

router.get("/create", authCheck, function(req, res) {
  res.render("create", {user: req.user});
});

module.exports = router;