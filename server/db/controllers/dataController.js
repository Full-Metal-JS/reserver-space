var models = require('../models');

module.exports = {
  addLocation: function(req, res, next) {
    var userId = req.body.userId;
    var locationName = req.body.locationName;

    return models.Location.create({
      location_name: locationName
    })
    .then(function(location) {
      models.UserLocation.create({
        UserId: userId,
        LocationId: location.id 
      });

      res.json({
        locationId: location.id,
        locationName: location.location_name
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

    usersToAdd.each(function(user, index, allUsersToAdd) {
      models.User.find({
        where: {
          username: user
        }
      })
      .spread(function(foundUser) {
        if (!foundUser) {
          return models.User.create({
            username: user,
            registered: false
          })
          .spread(function(pendingUser) {
            models.UserLocation.create({
              UserId: pendingUser.id,
              locationId: locationId
            });
          });
        }
        models.UserLocation.create({
          UserId: foundUser.id,
          LocationId: locationId
        });
      });
    });
    roomsToAdd.each(function(room, index, allRoomsToAdd) {
      return models.Room.create({
        room_name: room,
        location_id: locationId
      })
      .then(function(newRoom) {
        allRoomsToAdd[index] = {
          roomName: newRoom.room_name,
          roomId: newRoom.id
        }
      });
    });
    res.json({
      addedRooms: roomsToAdd
    });
  },
  addReservation: function(req, res, next) {
    var userId = req.body.userId;
    var roomId = req.body.locationId;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var reservationName = req.body.reservationName;

    return models.Reservation.create({
      user_id: userId,
      room_id: roomId,
      start_time: startTime,
      end_time: endTime,
      reservation_name: reservationName
    })
    .then(function(newReservation) {
      res.json({
        reservationName: newReservation.reservation_name,
        reservationId: newReservation.id
      });
    })
    .catch(function(err) {
      next(err);
    });
  }
}
