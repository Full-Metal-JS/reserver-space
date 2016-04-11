'use strict'
const db = require('./../db');
const Promise = require('bluebird');
const utils = require('./../../config/utils');

const locationModel = {
  // gets back either users at location or locations for users
  getUsersLocations: (type, id) => {
    return new Promise((resolve, reject) => {
      let queryString = `select locations.id, locations.location_name from userslocations inner join users on userslocations.userid=users.id inner join locations on userslocations.locationid=locations.id where ${type}.id=${id};`;
      
      utils.dbQuery(db, queryString, 'could not find any locations for user or users for location', resolve, reject);
    });
  },
  
  // creates location for user
  createLocation: () => {
    return new Promise((resolve, reject) => {
      
    });
  }
};

module.exports = locationModel;