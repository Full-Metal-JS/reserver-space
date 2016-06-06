'use strict';

// const db = require('./../db/db');
const { getUsersLocations, createLocation, addUserToLocation, deleteLocation, changeLocationName, getRoomsAndReservations } = require('../db/models/locationModel');

const locationController = {
  locationGet: ({ params: {id}, query: {type} }, res, next) => {
    if (type && id) {
      getUsersLocations(type, id)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else if (id && !type) {
      getRoomsAndReservations(id)
        .then(response => res.json(response))
        .catch(err => next(err));
    } else {
      next(new Error('must send user id'));
    }
  },

  locationPost: ({ params: { userID }, body: { locationName } }, res, next) => {
    if (userID && locationName) {
      createLocation(userID, locationName)
        .then(createdLocation => res.json(createdLocation))
        .catch(err => next(err));
    } else {
      next(new Error('must send user id and location name'));
    }
  },
  // updates a location to add users to it
  locationPut: ({ params: { userID, locationID } }, res, next) => {
    if (userID && locationID) {
      addUserToLocation(userID, locationID)
        .then(entry => res.json(entry))
        .catch(err => next(err));
    } else {
      next(new Error('must send user id and location id or location id'));
    }
  },
  
  // update location name
  locationPutName: ({ params: { locationID }, query: { newName } }, res, next) => {
    if (locationID && newName) {
      changeLocationName(locationID, newName)
        .then(updatedLocation => res.json(updatedLocation))
        .catch(err => next(err));
    } else {
      next(new Error('must send location id and new Name'));
    }
  },
  // deletes location
  locationDelete: ({ params: { locationID } }, res, next) => {
    if (locationID) {
      deleteLocation(locationID)
        .then(deleted => res.json(deleted))
        .catch(err => next(err));
    } else {
      next(new Error('must send location id'));
    }
  }
};

module.exports = locationController;
