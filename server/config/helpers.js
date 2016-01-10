var models = require("../db/models");

module.exports = {
  getAllData: function(userId) {
    return models.sequelize.query('select json_build_object(\'id\', "Locations".id,\'locationName\', "Locations"."location_name",\'rooms\', json_build_object(\'id\', "Rooms".id,\'roomName\', "Rooms"."room_name")) from "UserLocations" left join "Locations" on "UserLocations"."LocationId"="Locations".id left join "Rooms" on "Locations".id="Rooms"."LocationId"left join "Reservations" on "Rooms".id="Reservations"."RoomId" where "UserLocations"."UserId" =' + userId + ';');
  },
  getAllRooms: function(locationId) {
    return models.sequelize.query('select json_build_object(\'id\', "Rooms".id,\'roomName\', "Rooms"."room_name",\'reservations\', json_build_object(\'id\', "Reservations".id,\'reservationName\', "Reservations"."reservation_name",\'startTime\',"Reservations"."start_time",\'endTime\',"Reservations"."end_time")) from "Rooms" left join "Reservations" on "Rooms".id="Reservations"."RoomId" where "LocationId"=' + locationId + ';');
  },
  getAllUsersAtLocation: function(locationId) {
    return models.sequelize.query('select "Users"."username" from "Users" left join "UserLocations" on "Users".id="UserLocations"."UserId" where "UserLocations"."LocationId"='+ locationId + ';');
  }
}
