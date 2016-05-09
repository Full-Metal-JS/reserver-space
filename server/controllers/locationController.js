'use strict';

// const db = require('./../db/db');
const { getUsersLocations, createLocation, addUserToLocation, deleteLocation } = require('../db/models/locationModel');

const locationController = {
  locationGet: ({ params: {userID, locationID} }, res, next) => {
    if (userID) {
      getUsersLocations('users', userID)
        .then(users => res.json(users))
        .catch(err => next(err));
    } else if (locationID) {
      getUsersLocations('locations', locationID)
        .then(users => res.json(users))
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
      next(new Error('must send user id and location id'));
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