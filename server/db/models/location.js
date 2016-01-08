'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    location_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Location.belongsToMany(models.User, {through: models.UserLocation});
        Location.hasMany(models.Room);
      }
    }
  });
  return Location;
};