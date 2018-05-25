const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./user-model.js');

passport.serializeUser(function(user, done) {
  //id property created by mongodb, not google id
  done(null, user.id); //null = error
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  //stratgey options
  callbackURL: "/auth/google/redirect",
  clientID: process.env.GOOGLE_CONSUMER_KEY,
  clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
}, function(accessToken, refreshToken, profile, done) {
  //check if user already exists
  User.findOne({googleId: profile.id}).then(function(currentUser){
    if (currentUser) {
      //we already have this user
      //console.log("user is: " + currentUser);
      done(null, currentUser);
    } else {
      //create new user
      new User({
        username: profile.displayName,
        googleId: profile.id,
        thumbnail: profile._json.image.url
      }).save().then(function(newUser){
        //console.log("new user created: " + newUser);
        done(null, newUser);
      })
    } //end of else
  })
  
}));