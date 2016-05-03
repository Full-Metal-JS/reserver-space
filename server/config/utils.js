'use strict'
const { reduce, findLastKey } = require('lodash');

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
  
  // creates a string to update an entry in the db
  createUpdateString: (updateObj) => {
    return reduce(updateObj, (result, value, key, object) => {
      return (key === findLastKey(object)) ? `${result}${key}='${value}'` : `${result}${key}='${value}',`;
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
