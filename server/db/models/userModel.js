'use strict';
const db = require('./../db');
const utils = require('./../../config/utils');

const userModel = {
  // DRY code to create new user for all 3 different types of users
  createUser: (type, userInformation) => {
    return new Promise((resolve, reject) => {
      let queryString = (type === 'local') ? `insert into users (email, password, registered) values ('${userInformation.email}', '${userInformation.password}', true) returning *;`: `insert into users(${type}id, email, photo, registered) values ('${userInformation.id}', '${userInformation.email}', '${userInformation.photo}', true) returning *;`;

      utils.dbQuery(db, queryString, 'user could not be created', resolve, reject);
    });
  },
  // gets a user by a parameter that must be passed in. ie. fb id, google id, email
  getUserByParameter: (parameter, field) => {
    return new Promise((resolve, reject) => {
      let queryString = `select * from users where ${parameter}='${field}';`;

      utils.dbQuery(db, queryString, 'could not find that user', resolve, reject);
    });

  },
  // updates any fields for the user
  updateUser: (userId, updateObj) => {
    return new Promise((resolve, reject) => {
      let updateString = utils.createUpdateString(updateObj);
      
      let queryString = `update users set ${updateString} where id=${userId} returning *;`;
      
      utils.dbQuery(db, queryString, 'could not update that user', resolve, reject);
    });
  },
  
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      let queryString = `delete from users where id=${userId} returning *;`;
      
      utils.dbQuery(db, queryString, 'could not delete user', resolve, reject);
    });
  },
  
  getAllUsers: () => {
    
  }
};

module.exports = userModel;