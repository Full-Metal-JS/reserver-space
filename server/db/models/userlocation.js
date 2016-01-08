'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserLocation = sequelize.define('UserLocation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserLocation;
};