var models = require('../db/models');
var _ = require('underscore');
var Promise = require('bluebird');

module.exports = {
//   getAllData: function(user, callback) {
//     models.UserLocation.findAll({
//       where: {
//         UserId: user.id
//       }
//     })
//     .then(function(results){
//       return (_.map(results, function(location, index, list) {
//         return location.LocationId;
//       }));
//     })
//     .then(function(locationIds) {
//       return models.Location.findAll({
//         where: {
//           id: locationIds
//         }
//       })
//     })
//     .then(function(allLocations) {
//       return (_.map(allLocations, function(location, index, list) {
//         return {
//           id: location.id,
//           locationName: location.location_name,
//           rooms: []
//         }
//       }));
//     })
//     .then(function(locationsArray) {
//       // use previously created locationIds array to find corresponding rooms
//       return (models.Room.findAll({
//         where: {
//           LocationId: _.map(locationsArray, function(location, index, list) { 
//             return location.id 
//           })
//         }
//       })
//       .then(function(rooms) {
//         return _.each(locationsArray, function(location, index, locationList) {
//           _.each(rooms, function(room, index, roomList) {
//             if (location.id === room.LocationId) {
//               locationList[index].rooms.push({
//                 id: room.id,
//                 roomName: room.room_name,
//                 reservations: 
//               });
//             }
//           });
//         });
//       }))
//     })
//     .then(function(locationsArray) {
      
//     })
//   }
  getAllData: function(user, callback) {
    models.sequelize.query('select * from Locations left join Rooms on Locations.id=Rooms.LocationId left join Reservations on Rooms.id = Reservations.RoomId;')
      .then(function(poop) {
        callback(poop);
      })
  }
}
    //   .then(function(rooms) {
    //     return _.each(locationsArray, function(location, index, locationList) {
    //       _.each(rooms, function(room, index, roomList) {
    //         if (location.id === room.LocationId) {
    //           locationList[index].push({
    //             id: room.id,
    //             roomName: room.room_name,
    //             reservations: []
    //           });
    //         }
    //       });
    //     });
    //   }))
    // })
