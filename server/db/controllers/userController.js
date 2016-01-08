var models = require('../models');
var jwt = require('jwt-simple');
var helpers = require('../../config/helpers.js');
var sendGrid = require('../../email/sendGrid.js');
var data = require('../../data.js');
var _ = require('underscore');

module.exports = {
  signup: function(req, res, next) {
    var username = req.body.email;
    var password = req.body.password;

    models.User.findAll({
      where: {
        username: username
      }
    })
    .spread(function(user) {
      if (user) {
        if (user.registered) {
          res.status(403).send({error: 'User already exist!'});
          next(new Error('User already exist!'));
        }
        else {
          user.update({
            password: password,
            registered: true
          })
        }
      } else {
        return models.User.create({
          username: username,
          password: password,
          registered: true
        })
      }
    })
    .then(function(user) {
      var token = jwt.encode(user, 'secret');
      res.json({token: token});
    })
    .catch(function(error) {
      next(error);
    });
  },
  signin: function(req, res, next) {
    var username = req.body.email;
    var password = req.body.password;

    models.User.findAll({
      where: {
        username: username
      }
    })
    .spread(function(user) {
      if (!user) {
        res.status(401).send({error: 'User does not exist'});
        next(new Error('User does not exist'));
      } else {
        return user.checkPassword(password)
          .then(function(foundUser) {
            if (foundUser) {
              var token = jwt.encode(user, 'secret');
              // compile locations, rooms, reservations
              helpers.getAllData(user)
                .then(function(result) {
                  var locations = _.map(result[0], function(val, index, list) {
                    return val.json_build_object;
                  });
                  var newLocations = [];
                  _.each(locations, function(location, index, list) {
                    if (!_.find(newLocations, function(value) {
                      return (value.id === location.id);
                    })) {
                      newLocations.push({
                        id: location.id,
                        locationName: location.locationName,
                        rooms: [location.rooms]
                      });
                    } 
                    _.each(newLocations, function(newLocation, index, list) {
                      if (newLocation.locationName === location.locationName) {
                        newLocation.rooms.push(location.rooms);
                      }
                    });
                  });
                  console.log(newLocations);
                res.json({
                    username: user.username,
                    token: token,
                    data: {locations: newLocations}
                    });
                  });            
              } else {
              res.status(401).send('User or password is incorrect');
              next(new Error('User or password is incorrect'));
            }
          })
          .catch(function(error) {
            next(error);
          });
      }
    })
  },
  checkAuth: function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('no token'));
    } else {
      var user = jwt.decode(token, 'secret');

      models.User.findAll({
        where: {
          username: user.username
        }
      })
        .spread(function(foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .catch(function(error) {
          next(error);
        });
    }
  },
  addPendingUser: function(req, res, next) {
    var username = req.body.email;

    models.User.findAll({
      where: {
        username: username
      }
    })
    .spread(function(user) {
      if (user) {
        if (user.registered) {
          res.status(403).send({error: 'User is already registered!'});
          next(new Error('User already registered!'));
        } else {
          res.status(403).send({error: 'User is already pending'});
          next(new Error('User is already pending'));
          }
        } else {
          models.User.create({
            username: username,
            registered: false
          })
          .then(function(user) {
            sendGrid.signupEmail(user.username);
          })
          .catch(function(error) {
            next(error);
          });
        }
      })
    .catch(function(error) {
      next(error);
    });
  }
}