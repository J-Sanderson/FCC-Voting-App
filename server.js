const express = require('express');
const authRoutes = require('./auth-routes.js');
const passportSetup = require('./passport-setup.js');
const mongoose = require('mongoose');

var app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");

//connect to mongodb
mongoose.connect(process.env.MONGODB, function() {
  console.log("connected to MongoDB");
});

//setup routes
app.use("/auth", authRoutes);

app.get("/", function(req, res) {
  res.render("home");
  //res.sendFile(__dirname + '/views/index.html');
});

//rudimentary stuff only!
/*
app.get("/polls", function(req, res){
  res.send("This will be a big list of polls");
});

app.get("/user/:id", function(req, res) {
  res.send("This will show polls belonging to " + req.params.id);
});

app.get("/auth/google", function(req, res) {
  res.send("You can't log in yet!");
});
*/

app.listen(process.env.PORT, function() {
  console.log("now listening on " + process.env.PORT);
});
