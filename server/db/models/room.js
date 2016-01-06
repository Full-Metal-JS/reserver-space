'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    room_name: DataTypes.STRING,
    location_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Room.belongsTo(models.Room, {foreignKey: models.Room.location_id});
        Room.hasMany(models.Reservation, {foreignKey: models.Reservation.room_id});
      }
    }
  });
  return Room;
};