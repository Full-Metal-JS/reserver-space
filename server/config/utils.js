'use strict'

const jwt = require('jwt-simple');

module.exports = {
  logError: (err, req, res, next) => {
    console.error(err.stack);
    next(err);
  },
  handleError: function(err, req, res) {
    res.status(500).send({error: err.message});
  },
  decode: function(req, res, next) {
    let token = req.headers['x-access-token'];
    let user = null;

    if (!token) {
      return res.status(403).send();
    }
    try {
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
};
