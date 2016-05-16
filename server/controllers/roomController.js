'use strict';

const { getAllRoomsAtLocation, createRoom,
  updateRoom, deleteRoom
} = require('../db/models/roomModel');

const roomController = {
  // server route to get rooms at a given location: params location id
  roomGet: ({ params: {locationID }}, res, next) => {
    if (locationID) {
      getAllRoomsAtLocation(locationID)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('must send location id'));
    }
  },
  // room post takes in roomname and locationID: roomname query string, id url param
  roomPost: ({ params: { locationID }, query: { roomName } }, res, next) => {
    if (locationID && roomName) {
      createRoom(roomName, locationID)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('must send new room name and location id'));
    }
  },
  // server route for updating a name of a room
  roomPut: ({ params: { roomID }, query: { newName } }, res, next) => {
    if (roomID && newName) {
      updateRoom(roomID, newName)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('must send new room name and room id'));
    }
  },

  roomDelete: ({ params: { roomID } }, res, next) => {
    if (roomID) {
      deleteRoom(roomID)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('must send a room id to delete that room'));
    }
  }
};

module.exports = roomController;