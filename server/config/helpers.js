var models = require('../db/models');

function getLocationIds(user) {
  models.UserLocation.findAll({
    where: {
      UserId: user.id 
    }
  })
  .spread(function(locationIds) {
    return locationIds;
  });
}

function getAllLocations(locationIds, callback) {
  var locationArray = locationIds.map(function(value, key, list) {
    models.Location.find({
      where: {
        id: value
      }
    })
    .spread(function(location){
      return {
        id: location.id,
        name: location.location_name
      }
    })
    .catch(function(err) {
      return err;
    });
  });
  callback(locationArray);
}

function getAllRooms(locationsArray, callback) {
  locationsArray.each(function(value, index, list) {
    models.Room.findAll({
      where: {
        location_id: value.id
      }
    })
    .spread(function(rooms) {
      list[index].rooms = rooms.map(function(value, key, list) {
        return {
          id: value.id,
          name: value.room_name
        }
      })
    })
  })
  callback(locationsArray);
}

function getAllReservations(locationsArray, callback) {
  locationsArray.each(function(value, index, locations) {
    locations[index].each(function(value, index, rooms) {
      models.Reservation.findAll({
        where: {
          room_id: value.id
        }
      })
      .spread(function(reservations) {
        rooms[index].reservations = reservations.map(function(value, key, list) {
          return {
            id: value.id,
            name: value.reservation_name,
            start_time: value.start_time,
            end_time: value.end_time
          }
        });
      });
    });
  });
  callback(locationsArray);
}

module.exports = {
  getAllData: function(user) {
    var allData;
    var locationIds = getLocationIds(user);
    if (locationIds){
      getAllLocations(locationIds, 
        getAllRooms(locationsArray, 
          getAllReservations(locationsArray, 
            function(locationsArray) {
              allData = {
                locations: locationsArray
              }
            })));
      return allData;
    } else {
      return allData = [];
    }
  }
}