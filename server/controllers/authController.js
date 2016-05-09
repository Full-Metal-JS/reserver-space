'use strict';
const passport = require('passport');
const User = require('./../db/models/userModel');
// const utils = require('./../config/utils');

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
    console.log('session', req.session);
    console.log('passport', req.passport);
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
        User.createUser('google', googleId);
        then(createdUser => {
            res.json(createdUser);
          })
          .catch(err => {
            next(err);
          });
      });
  },
  
  validateFacebook: ({ user: { displayName, id, emails}, session }, res, next) => {
    session.name = displayName;
    session.facebookId = id;
    session.picture = `https://graph.facebook.com/${id}/picture?height=500`;
    session.email = emails[0].value;

    User.getUserByParameter('facebookid', id)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        User.createUser('facebook', {
          email: emails[0].value,
          photo: `https://graph.facebook.com/${id}/picture?height=500`,
          id
        })
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
    failureRedirect: '/'
  })
};

module.exports = authController;