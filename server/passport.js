const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bluebird').PromisifyAll(require('bcrypt'));

const applyPassportMiddleware = (app, passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    // logic of signup
  })
  );
  
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true   
  }, (req, email, password, done) => {
    process.nextTick(() => {
      // logic of signin
    });
  }));
  
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email', 'photos', 'timezone', 'gender']
  },
    (token, refreshToken, profile, done) => {
      process.nextTick(() => {
        done(null, profile);
      });
    }
  ));
  
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, 
    (token, refreshToken, profile, done) => {
      process.nextTick(() => {
        done(null, profile)
      });
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = applyPassportMiddleware;
