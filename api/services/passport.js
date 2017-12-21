const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const mongoose = require('mongoose');
const keys = require('../config/keys');

//const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  //done(null, user.id);
  done(null, 123);
});

passport.deserializeUser((id, done) => {
  //User.findById(id).then(user => {
    // done(null, user);
  //});
  done(null, {apiKey: '123'});
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/api/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //const existingUser = await User.findOne({ googleId: profile.id });
      const existingUser = null;

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = {apiKey: '123'};
      //const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
