'use strict';
const db = require('./../db');
const { dbQuery } = require('./../../config/utils');

const locationModel = {
  // gets back either users at location or locations for users
  getUsersLocations: (type, id) => new Promise((resolve, reject) => {
    let queryString = `select locations.id, locations.location_name, users.id, users.email, users.photo from userslocations inner join users on userslocations.userid=users.id inner join locations on userslocations.locationid=locations.id where ${type}.id=${id};`;
    
    dbQuery(db, queryString, 'could not find any locations for user or users for location', resolve, reject);
  }),
  
  // get all the rooms and reservations for a location in nested objects
  getRoomsAndReservations: (locationId) => new Promise((resolve, reject) => {
    let queryString = `select rooms.id, rooms.room_name, json_agg(reservations.*) as reservations from rooms inner join reservations on rooms.id=reservations.roomid where locationid=${locationId} group by rooms.id, rooms.room_name;`;
                 
    dbQuery(db, queryString, 'could not get data for that location', resolve, reject);
  }),
  
  // creates location for user
  // need to create location in db and add user location entry in the junction table
  createLocation: (userID, locationName) => new Promise((resolve, reject) => {
    let queryString = `insert into locations (location_name) values ('${locationName}') returning *;`;

    dbQuery(db, queryString, 'could not create location', row => {
      locationModel.addUserToLocation(userID, row.id)
        .then(res => {
          resolve(res);
        });
    }, reject);
  }),
  
  changeLocationName: (locationId, newName) => new Promise((resolve, reject) => {
    let queryString = `update locations set location_name='${newName}' where id=${locationId} returning *;`;
    
    dbQuery(db, queryString, 'could not update location', resolve, reject);
  }),

  // updates location with new room or user
  addUserToLocation: (userID, locationID) => new Promise((resolve, reject) => {
    let queryString = `insert into userslocations (userid, locationid) values (${userID}, ${locationID}) returning *;`;

    dbQuery(db, queryString, 'could not add user to location', resolve, reject);
  }),

  // deletes a location
  deleteLocation: locationID => new Promise((resolve, reject) => {
    let queryString = `delete from locations where id=${locationID} returning *;`;

    dbQuery(db, queryString, 'could not delete location', resolve, reject);
  })
};

module.exports = locationModel;