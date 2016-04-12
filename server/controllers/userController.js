'use strict'

const db = require('./../db/db');
const User = require('./../db/models/userModel');
const _ = require('lodash');

const userController = {
  // update user 
  userPut: (req, res, next) => {
    if (!_.isEmpty(req.body && req.params.userId)) {
      User.updateUser(req.params.userId, req.body)
        .then(updatedUser => {
          res.json(updateUser);
        })
        .catch(err => {
          next(err);
        });
    } else {
      next(new Error('must send update params and userId'));
    }
  },
  
  userDelete: (req, res, next) => {
    if (req.params.userId) {
      User.deleteUser(userId)
        .then(deletedUser => {
          res.json(deletedUser);
        })
        .catch(err => {
          next(err);
        });
    } else {
      next(new Error('must send user id'));
    }
  }
}

module.exports = userController;