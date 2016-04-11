'use strict'
const db = require('./../db');
const Promise = require('bluebird');

const userModel = {
  createUser: (type, userInformation) => {
    // DRY code to create new user for all 3 different types of users
    return new Promise((resolve, reject) => {
      let queryString = (type === 'local') ? `insert into users (email, password, registered) values ('${userInformation.email}', '${userInformation.password}', true) returning *;`: `insert into users(${type}id, email, photo, registered) values ('${userInformation.id}', '${userInformation.email}', '${userInformation.photo}', true) returning *;`;
    
      db.query(queryString)
        .map(response => {
          if (response.rowCount) {
            return response.rows[0];
          } 
          reject(new Error('user could not be created'));
        })
        .subscribe(createdUser => {
          resolve(createdUser);
        },
        err => {
          reject(err);
        });     
    });
  },
  getUserByParameter: (parameter, field) => {
    // gets a user by a parameter that must be passed in. ie. fb id, google id, email
    return new Promise((resolve, reject) => {
      let queryString = `select * from users where ${parameter}='${field}';`;
      
      db.query(queryString)
        .map(response => {
          if (response.rowCount) {
            return response.rows[0];
          } 
          reject(new Error('could not find that user'));
        })
        .subscribe(user => {
          resolve(user);
        },
        err => {
          reject(err);
        });     
    });

  },
  
  updateUser: (userId, updateObj) => {
    return new Promise((resolve, reject) => {
      
    });
  },
  
  deleteUser: () => {
    return new Promise((resolve, reject) => {
      
    });
  },
  
  getAllUsers: () => {
    
  }
};

module.exports = userModel;