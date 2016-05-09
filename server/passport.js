'use strict';
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const pify = require('pify');
const bcrypt = pify(require('bcrypt-nodejs'));
const User = require('./db/models/userModel');
const isEmpty = require('lodash').isEmpty;

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
    User.getUserByParameter('email', email)
      .then(user => {
        if (!isEmpty(user)) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken'));  
        }
        
        //  else {
        //   bcrypt.genSalt(10)
        //     .then(salt => {
        //       bcrypt.hash(password, salt)
        //         .then(hash => {
        //           User.createUser('local', {
        //             email: email,
        //             password: hash
        //           })
        //           .then(newUser => {
        //             return done(null, newUser);
        //           })
        //           .catch(err => {
        //             return done(err);
        //           });
        //         })
        //         .catch(err => {
        //           return done(err);
        //         });
        //     })
        //     .catch(err => {
        //       return done(err);
        //     });
        // }
      })
      .catch(err => {
        bcrypt.genSalt(10)
          .then(salt => {
            bcrypt.hash(password, salt, null)
              .then(hash => {
                User.createUser('local', {
                  email: email,
                  password: hash
                })
                .then(newUser => {
                  return done(null, newUser);
                })
                .catch(err => {
                  return done(err);
                });
              })
              .catch(err => {
                return done(err);
              });
          })
          .catch(err => {
            return done(err);
          });
      });
  })
  );
  
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true   
  }, (req, email, password, done) => {
    process.nextTick(() => {
      // logic of signin
      User.getUserByParameter('email', email)
        .then(user => {
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              return (isMatch) ? done(null, user) : done(null, false, req.flash('loginMessage', 'Wrong Password'));
            })
            .catch(err => {
              return done(err);
            });
        })
        .catch(err => {
          return done(err);
        });
    });
  }));
  
  // passport.use(new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_APP_ID,
  //   clientSecret: process.env.FACEBOOK_APP_SECRET,
  //   callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  //   profileFields: ['id', 'displayName', 'email', 'photos', 'timezone', 'gender']
  // },
  //   (token, refreshToken, profile, done) => {
  //     process.nextTick(() => {
  //       done(null, profile);
  //     });
  //   }
  // ));
  
  // passport.use(new GoogleStrategy({
  //   clientID: process.env.GOOGLE_APP_ID,
  //   clientSecret: process.env.GOOGLE_APP_SECRET,
  //   callbackURL: process.env.GOOGLE_CALLBACK_URL
  // }, 
  //   (token, refreshToken, profile, done) => {
  //     process.nextTick(() => {
  //       done(null, profile)
  //     });
  //   }
  // ));

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = applyPassportMiddleware;
