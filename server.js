const express = require('express');
const authRoutes = require('./auth-routes.js');
const profileRoutes = require('./profile-routes.js');
const passportSetup = require('./passport-setup.js');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

var app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, //1 day in ms
  keys: [process.env.KEY]
}));

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(process.env.MONGODB, function() {
  console.log("connected to MongoDB");
});

//setup routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", function(req, res) {
  res.render("home", {user: req.user});
  //res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT, function() {
  console.log("now listening on " + process.env.PORT);
});
