'use strict'
const passport = require('passport');
const User = require('./../db/models/userModel');
const jwt = require('jwt-simple');
const utils = require('./../config/utils');

const authController = {
  logout: (req, res, next) => {
    req.logout();
    res.clearCookie('reserver-space');
    res.redirect('/');
  },

  signup: passport.authenticate('local-signup', {
    failureFlash: true
  }),
  
  login: passport.authenticate('local-login', {
    failureFlash: true
  }),
  
  updateSession: (req, res) => {
    console.log('session', req.session)
    console.log('passport', req.passport)
    console.log('user', req.user);
    res.send('success');
  },
  
  validateGoogle: (req, res, next) => {
    let googleId = req.user.id;
    
    req.session.googleId = googleId;
    req.session.picture = req.user._json.image.url + '0';
    req.session.email = req.user.emails[0].value;
    
    User.getUserByParameter('googleId', googleId)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        User.createUser('google', googleId)
          then(createdUser => {
            res.json(createdUser);
          })
          .catch(err => {
            next(err);
          });
      });
  },
  
  validateFacebook: (req, res, next) => {
    req.session.name = req.user.displayName;
    req.session.facebookId = req.user.id;
    req.session.picture = `https://graph.facebook.com/${req.user.id}/picture?height=500`;
    req.session.email = req.user.emails[0].value;
    
    User.getUserByParameter('facebook', req.user.id)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        User.createUser('facebook', req.user.id)
          .then(createdUser => {
            res.json(createdUser);
          })
          .catch(err => {
            next(err);
          });
      });
  },
  
  facebook: passport.authenticate('facebook', {
    scope: ['email']
  }),

  facebookCallback: passport.authenticate('facebook', {
    failureRedirect: '/'
  }),

  google: passport.authenticate('google', {
    scope: ['profile', 'email']
  }),

  googleCallback: passport.authenticate('google', {
    failureRedirect: '/login'
  })
};

module.exports = authController;