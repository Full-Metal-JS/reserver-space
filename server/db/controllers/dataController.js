var models = require('../models');
var _ = require('underscore');
var helper = require('../../config/helpers.js');
var sendGrid = process.env.SEND_GRID;

module.exports = {
  addLocation: function(req, res, next) {
    var userId = req.body.userId;
    var locationName = req.body.locationName;

    models.Location.create({
      location_name: locationName
    })
    .then(function(newLocation) {
      models.UserLocation.create({
        UserId: userId,
        LocationId: newLocation.id
      });

      res.json({
        id: newLocation.id,
        locationName: newLocation.location_name,
        rooms: []
      });
    })
    .catch(function(error) {
      next(error);
    });
  },
  addRoomsAndUsers: function(req, res, next) {
    var locationId = req.body.locationId;
    var usersToAdd = req.body.usersToAdd;
    var roomsToAdd = req.body.roomsToAdd;

    if (usersToAdd) {
      _.each(usersToAdd.split(','), function(user, index, allUsersToAdd) {
        models.User.find({
          where: {
            username: user
          }
        })
        .then(function(foundUser) {
          if (!foundUser) {
            models.User.create({
              username: user,
              registered: false
            })
            .spread(function(pendingUser) {
              models.UserLocation.create({
                UserId: pendingUser.id,
                LocationId: locationId
              });
            });
          }
          models.UserLocation.create({
            UserId: foundUser.id,
            LocationId: locationId
          });
        });
      });
    }

    if (roomsToAdd) {
    roomsToAdd = roomsToAdd.split(',');
      _.each(roomsToAdd, function(room, index, allRoomsToAdd) {
        console.log('room: ', room);
        models.Room.create({
          room_name: room,
          LocationId: locationId
        })
        .then(function(newRoom) {
          roomsToAdd[index] = {
            roomName: newRoom.room_name,
            roomId: newRoom.id
          }
        });
      });
      res.json({
        addedRooms: roomsToAdd
      });
    }
  },
  addReservation: function(req, res, next) {
    var userId = req.body.userId;
    var locationId = req.body.locationId;
    var roomId = req.body.roomId;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var reservationName = req.body.reservationName;
    var location;
    var room;
    var createdByUser;

    models.Reservation.create({
      UserId: userId,
      RoomId: roomId,
      start_time: startTime,
      end_time: endTime,
      reservation_name: reservationName
    })
    .then(function(newReservation) {
      res.json({
        reservationName: newReservation.reservation_name,
        reservationId: newReservation.id
      });

      models.Location.findById(locationId).then(function(foundLocation) {
        location = foundLocation;
      })
      .catch(function(error) {
        next(error);
      });

      models.Room.findById(roomId).then(function(foundRoom) {
        room = foundRoom;
      })
      .catch(function(error) {
        next(error);
      });

      models.User.findById(userId).then(function(foundUser) {
         createdByUser = foundUser;
      })
      .catch(function(error) {
        next(error);
      });

      var emailReservationDetails = {
        reservationName: reservationName,
        location: location,
        room: room,
        start: newReservation.start_time,
        end: newReservation.end_time,
        createdBy: createdByUser
      };
      if (!sendGrid) {sendGrid = require('../../email/sendGrid.js');}
      var usersList = helper.getAllUsersAtLocation(locationId);
      _.each(usersList, function(user) {
        sendGrid.reservationEmail(user.username, emailReservationDetails);
      });
    })
    .catch(function(err) {
      next(err);
    });
  }
}