'use strict';
var bcrypt = require('bcrypt');
var Q = require('q');

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
        // var user = this;
        // console.log(user.password);
        // bcrypt.compare(password, user.password, function(err, isMatch) {
        //   return isMatch;
        // });
      },
      generateHash: function(password, done) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, done);
        });
      }
    }
  })
  User.beforeCreate(function(model, options, done) {
    if (!model.isModified('password')) {
      return done();
    }
    model.generateHash(model.password, function(err, hash) {
      if (err) {
        return done(err);
      }
      model.password = hash;
      model.save();
      return done(null, options);
    });
  });
  return User;
};