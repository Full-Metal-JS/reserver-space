'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    reservation_name: DataTypes.STRING,
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    start_time: DataTypes.STRING,
    end_time: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Reservation.belongsTo(models.Room, {foreignKey: models.Room.room_id});
        Reservation.belongsTo(models.User, {foreignKey: models.User.user_id});
      }
    }
  });
  return Reservation;
};