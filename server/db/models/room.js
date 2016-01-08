'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    room_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Room.belongsTo(models.Location);
        Room.hasMany(models.Reservation);
      }
    }
  });
  return Room;
};