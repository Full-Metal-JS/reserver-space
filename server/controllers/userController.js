'use strict';

const User = require('./../db/models/userModel');
const _ = require('lodash');

const userController = {
  // update user 
  userPut: ({body, params: { userId }}, res, next) => {
    if (!_.isEmpty(body && userId)) {
      User.updateUser(userId, body)
        .then(updatedUser => {
          res.json(updatedUser);
        })
        .catch(err => {
          next(err);
        });
    } else {
      next(new Error('must send update params and userId'));
    }
  },
  
  userDelete: ({ params: { userId }}, res, next) => {
    if (userId) {
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
};

module.exports = userController;