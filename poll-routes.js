const router = require('express').Router();
const Poll = require('./poll-model.js');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

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

router.post("/created", urlencodedParser, authCheck, function(req, res) {
  //handle post req from poll-client.js - todo vid part 4
  res.send('POST request to the homepage');
});

module.exports = router;
