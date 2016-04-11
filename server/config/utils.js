'use strict'

const jwt = require('jwt-simple');
const _ = require('lodash');

module.exports = {
  // logs the error
  logError: (err, req, res, next) => {
    console.error(err.stack);
    next(err);
  },
  // makes sure every error is a 500
  handleError: (err, req, res) => {
    res.status(500).send({error: err.message});
  },
  // decodes the token
  decode: (req, res, next) => {
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
  },
  // creates a string to update an entry in the db
  createUpdateString: (updateObj) => {
    return _.reduce(updateObj, (result, value, key, object) => {
      return (key === _.findLastKey(object)) ? `${result}${key}='${value}'` : `${result}${key}='${value}',`;
    }, '');
  },
  // db query function takes in the db connection, query string and error message
  dbQuery: (db, queryString, errorMsg, resolve, reject) => {
    db.query(queryString)
      .map(response => {
        if (response.rowCount) {
          return response.rows[0];
        }
        reject(new Error(errorMsg));
      })
      .subscribe(row => {
        resolve(row);
      },
      err => {
        reject(err);
      });
  }
};
