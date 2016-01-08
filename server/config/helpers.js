var models = require('../db/models');
var _ = require('underscore');
var Promise = require('bluebird');

module.exports = {
  getAllData: function(user, callback) {
    models.sequelize.query('select * from "Locations" left join "Rooms" on "Locations".id="Rooms"."LocationId" left join "Reservations" on "Rooms".id = "Reservations"."RoomId";')
      .then(function(result) {
        return result;
      })
  }
}
