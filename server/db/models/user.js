'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    registered: DataTypes.BOOLEAN,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Location, {through: models.UserLocation});
        User.hasMany(models.Reservation, {foreignKey: models.Reservation.user_id});
      }
    }
  });
  return User;
};