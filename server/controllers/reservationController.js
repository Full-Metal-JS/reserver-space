'use strict';

const { getAllReservationsForUser, getAllReservationsAtRoom,
  createReservation, updateReservation,
  deleteReservation
} = require('../db/models/reservationModel');
const { isEmpty } = require('lodash');

const reservationController = {
  reservationGet: ({ query: { userID, roomID }}, res, next) => {
    if (userID && !roomID) {
      getAllReservationsForUser(userID)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else if (roomID && !userID) {
      getAllReservationsAtRoom(roomID)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('need to send user id or room id not both as a url query string'));
    }
  },

  reservationPost: ({ body }, res, next) => {
    if (!isEmpty(body)) {
      createReservation(body)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('must send all required information to create a reservation'));
    }
  },

  reservationPut: ({ body, params: reservationID }, res, next) => {
    if (!isEmpty(body) && reservationID) {
      updateReservation(reservationID, body)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('must send all parameters'));
    }
  },

  reservationDelete: ({ params: reservationID }, res, next) => {
    if (reservationID) {
      deleteReservation(reservationID)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('must send reservation id to delete'));
    }
  }
};

module.exports = reservationController;
