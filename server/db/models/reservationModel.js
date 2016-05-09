'use strict';
const db = './../db';
const { dbQuery, createUpdateString } = require('./../../config/utils');

const reservationModel = {
  getAllReservationsForUser: userID => new Promise((resolve, reject) => {
    let queryString = `select reservation_name, start_time, end_time, date from
     userslocations inner join users on userslocations.userid=users.id inner join 
     locations on userslocations.locationid=locations.id inner join rooms on 
     rooms.locationid=location.id inner join reservations on reservations.roomid=
     rooms.id where users.id=${userID};`;

    dbQuery(db, queryString, 'could not get all reservations for user', resolve, reject);
  }),

  // gets all reservations for a room
  getAllReservationsAtRoom: roomID => new Promise((resolve, reject) => {
    let queryString = `select * from rooms inner join reservations on reservations.roomid=rooms.id where rooms.id=${roomID};`;

    dbQuery(db, queryString, 'could not get all reservations for a room', resolve, reject);
  }),

  // creates a reservation; needs room id
  createReservation: ({ name, startTime, endTime, date, userID, roomID }) => new Promise((resolve, reject) => {
    let queryString = `insert into reservations (reservation_name, start_time, end_time, date, userid, roomid) values ('${name}', '${startTime}', '${endTime}', '${date}', ${userID}, ${roomID}) returning *;`;

    dbQuery(db, queryString, 'could not create reservation', resolve, reject);
  }),

  // update reservation
  updateReservation: (reservationID, updateObj) => new Promise((resolve, reject) => {
    let updateString = createUpdateString(updateObj);

    let queryString = `update reservations set ${updateString} where id=${reservationID} returning *;`;

    dbQuery(db, queryString, 'could not update reservation', resolve, reject);
  }),

  // delete reservation
  deleteReservation: reservationID => new Promise((resolve, reject) => {
    let queryString = `delete from reservations where id=${reservationID} returning *;`;

    dbQuery(db, queryString, 'could not delete reservation', resolve, reject);
  })
};

module.exports = reservationModel;