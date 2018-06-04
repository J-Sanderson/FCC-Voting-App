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

//note: the order these routes are listed here does seem to matter
//"/" should therefore go last?

router.get("/create", authCheck, function(req, res) {
  //redirect if new poll has been created?
  if (Object.keys(req.query).length == 0) { //no query string, return poll create page
    res.render("create", {user: req.user});
  } else {
    res.redirect("/profile"); //would prefer to return to the poll page itself, though
  }
});

router.post("/create", urlencodedParser, authCheck, function(req, res) {
  //handle post req from poll-client.js
  var optObj = {}; //this will hold the option/votes pairs
  //convert poll options to array
  var optArr = req.body.options.split(',').map(function(x){
    return x = x.replace(/^\s*|\s*$/g, ''); //strip leading/trailing whitespace
  })
  optArr.forEach(function(x){
    optObj[x] = 0; //add to object with zero votes to start
  });
  //create new database record for this poll
  new Poll({
    title: req.body.pollname,
    creator: req.user.id, //mongodb created id for user
    options: JSON.stringify(optObj),
    voted: [] //remains empty until someone votes later
  }).save();
});

router.get("/:id", function(req, res) {
  Poll.findById(req.params.id, function(err, poll){
    if (err) {
      res.send("An error has occured")
    } else {
      if (poll) {
        res.render("pollview", {user: req.user, poll: poll});
      } else {
        res.send("This poll does not exist");
      }
    }
  })
});

router.post("/:id", urlencodedParser, function(req, res) {
  Poll.findById(req.params.id, function(err, poll){
    //update details of poll
    //get name of vote
    var votedFor = Object.keys(req.body)[0];
    //parse out option/vote pairs
    var options = JSON.parse(poll.options);
    //iterate vote number
    options[votedFor] ++;
    //update poll object
    poll.options = JSON.stringify(options);
    poll.save(function(err, updatedPoll) {
      //console.log(updatedPoll);
    });
  });
});

router.delete("/:pollId", function(req, res){
  res.redirect("/");
  Poll.findByIdAndRemove(req.params.pollId, function(err, poll) {
    if (err) {
      res.send("An error has occured");
    }
  });
});

router.get("/", function(req, res) {
  //get all polls
  Poll.find(function(err, polls) {
    res.render("allpolls", {user: req.user, polls: polls})
  });
})

module.exports = router;