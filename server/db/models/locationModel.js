'use strict';
const db = require('./../db');
const { dbQuery } = require('./../../config/utils');

const locationModel = {
  // gets back either users at location or locations for users
  getUsersLocations: (type, id) => new Promise((resolve, reject) => {
    let queryString = `select locations.id, locations.location_name from userslocations inner join users on userslocations.userid=users.id inner join locations on userslocations.locationid=locations.id where ${type}.id=${id};`;
    
    dbQuery(db, queryString, 'could not find any locations for user or users for location', resolve, reject);
  }),
  
  // creates location for user
  // need to create location in db and add user location entry in the junction table
  createLocation: (userID, locationName) => new Promise((resolve, reject) => {
    let queryString = `insert into locations (name) values ('${locationName}') returning *;`;

    dbQuery(db, queryString, 'could not create location', row => {
      this.addUserToLocation(userID, row.id)
        .then(res => {
          resolve(res);
        });
    }, reject);
  }),

  // updates location with new room or user
  addUserToLocation: (userID, locationID) => new Promise((resolve, reject) => {
    let queryString = `insert into userslocations (userid, locationid) values (${userID}, ${locationID}) returning *;`;

    dbQuery(db, queryString, 'could not add user to location', resolve, reject);
  })
};

module.exports = locationModel;