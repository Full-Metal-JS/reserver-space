'use strict';
const db = './../db';
const { dbQuery } = require('./../../config/utils');

const roomModel = {
  // gets all rooms at a location
  getAllRoomsAtLocation: locationID => new Promise((resolve, reject) => {
    let queryString = `select rooms.id, rooms.room_name, rooms.locationid from rooms inner join locations on rooms.locationid=location.id where location.id=${locationID};`;

    dbQuery(db, queryString, 'could not get all rooms at location', resolve, reject);
  }),

  // create a room
  createRoom: (roomName, locationID) => new Promise((resolve, reject) => {
    let queryString = `insert into rooms (room_name, locationid) values ('${roomName}', ${locationID}) returning *;`;

    dbQuery(db, queryString, 'could not create room', resolve, reject);
  }),

  // update room name
  updateRoom: (roomID, newName) => new Promise((resolve, reject) => {
    let queryString = `update rooms set room_name='${newName}' where id=${roomID} returning *;`;

    dbQuery(db, queryString, 'could not update room', resolve, reject);
  }),

  // deletes room
  deleteRoom: roomID => new Promise((resolve, reject) => {
    let queryString = `delete from rooms where id=${roomID} returning *;`;

    dbQuery(db, queryString, 'could not delete room', resolve, reject);
  })
};

module.exports = roomModel;