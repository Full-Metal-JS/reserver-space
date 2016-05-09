'use strict';
const db = require('./../db');
const { dbQuery, createUpdateString } = require('./../../config/utils');

const userModel = {
  // DRY code to create new user for all 3 different types of users
  createUser: (type, { email, password, id, photo}) => new Promise((resolve, reject) => {
    let queryString = (type === 'local') ? `insert into users (email, password, registered) values ('${email}', '${password}', true) returning *;`: `insert into users(${type}id, email, photo, registered) values ('${id}', '${email}', '${photo}', true) returning *;`;

    dbQuery(db, queryString, 'user could not be created', resolve, reject);
  }),

  // gets a user by a parameter that must be passed in. ie. fb id, google id, email
  getUserByParameter: (parameter, field) => new Promise((resolve, reject) => {
    let queryString = `select * from users where ${parameter}='${field}';`;

    dbQuery(db, queryString, 'could not find that user', resolve, reject);
  }),

  // updates any fields for the user
  updateUser: (userId, updateObj) => new Promise((resolve, reject) => {
    let updateString = createUpdateString(updateObj);
    
    let queryString = `update users set ${updateString} where id=${userId} returning *;`;
    
    dbQuery(db, queryString, 'could not update that user', resolve, reject);
  }),
  
  deleteUser: (userId) => new Promise((resolve, reject) => {
    let queryString = `delete from users where id=${userId} returning *;`;
    
    dbQuery(db, queryString, 'could not delete user', resolve, reject);
  }),
  
  getAllUsers: () => new Promise((resolve, reject) => {
    let queryString = 'select * from users;';

    dbQuery(db, queryString, 'could not get all users', resolve, reject);
  })
};

module.exports = userModel;