'use strict'

const User = require('./../controllers/userController');
const Location = require('./../controllers/locationController');

const routeConfig = (router) => {
  router.put('/user/:userId', User.userPut);
  router.delete('/user/:userId', User.userDelete);
};

module.exports = routeConfig;