'use strict';

const { 
  userPut, 
  userDelete 
} = require('./../controllers/userController');
const { 
  locationGet, 
  locationPost, 
  locationPut, 
  locationDelete 
} = require('./../controllers/locationController');
const {
  roomGet,
  roomPost,
  roomPut,
  roomDelete
} = require('./../controllers/roomController');
const {
  reservationGet,
  reservationPost,
  reservationPut,
  reservationDelete
} = require('./../controllers/reservationController');

const routeConfig = (router) => {
  // user routes
  router.put('/user/:userId', userPut);
  router.delete('/user/:userId', userDelete);

  // location routes
  router.get('/location/:id', locationGet);
  router.post('/location/:userID', locationPost);
  router.put('/location/:locationID/:userID', locationPut);
  router.delete('/location/:locationID', locationDelete);

  // room routes
  router.get('/room/:locationID', roomGet);
  router.post('/room/:locationID', roomPost);
  router.put('/room/:roomID', roomPut);
  router.delete('/room/:roomID', roomDelete);

  // reservation routes
  router.get('/reservation', reservationGet);
  router.post('/reservation', reservationPost);
  router.put('/reservation/:reservationID', reservationPut);
  router.delete('/reservation/:reservationID', reservationDelete);
};

module.exports = routeConfig;