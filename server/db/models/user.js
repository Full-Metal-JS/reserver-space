'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
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
    },
    instanceMethods: {
      checkPassword: function(password, next) {
        var savedPW = this.password;
        bcrypt.compare(password, savedPW, next);
      },
      generateHash: function(password, next) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, next);
        });
      }
    }
  })
  User.beforeCreate(function(model, next) {
    model.generateHash(model.password, function(err, hash) {
      if (err) return err;
      model.password = hash;
      next();
    })
  })
  return User;
};