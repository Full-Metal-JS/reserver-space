'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    reservation_name: DataTypes.STRING,
    start_time: DataTypes.STRING,
    end_time: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Reservation.belongsTo(models.Room);
        Reservation.belongsTo(models.User);
      }
    }
  });
  return Reservation;
};