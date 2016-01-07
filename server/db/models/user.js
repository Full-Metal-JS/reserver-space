'use strict';
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    registered: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Location, {through: models.UserLocation});
        User.hasMany(models.Reservation);
      }
    },
    instanceMethods: {
      checkPassword: function(password) {
        var defer = Q.defer();
        var savedPW = this.password;
        bcrypt.compare(password, savedPW, function(err, isMatch) {
          if (err) {
            defer.reject(err);
          } else {
            defer.resolve(isMatch);
          }
        });
        return defer.promise;
      },
      generateHash: function(password, done) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, null, done);
        });
      }
    }
  })
  User.beforeCreate(function(model, options, done) {
    model.generateHash(model.password, function(err, hash) {
      if (err) {
        return done(err);
      }
      model.password = hash;
      return done(null, options);
    });
  });
  return User;
};