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
    console.log(req.session)
    console.log(req.passport)
    console.log(req.user);
    res.send('success');
  }
};

module.exports = authController;