'use strict';

const { userPut, userDelete } = require('./../controllers/userController');
const { locationGet, locationPost, locationPut, locationDelete } = require('./../controllers/locationController');

const routeConfig = (router) => {
  // user routes
  router.put('/user/:userId', userPut);
  router.delete('/user/:userId', userDelete);

  // location routes
  router.get('/location/:id', locationGet);
  router.post('/location/:userID', locationPost);
  router.put('/location/:locationID/:userID', locationPut);
  router.delete('/location/:locationID', locationDelete);
};

module.exports = routeConfig;