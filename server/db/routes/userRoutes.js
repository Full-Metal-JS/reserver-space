var models = require('../models');
var userController = require('../controllers/userController.js');
var dataController = require('../controllers/dataController.js');

module.exports = function(app) {
  app.post('/signup', userController.signup);
  app.post('/signin', userController.signin);
  app.post('/signedin', userController.checkAuth);
  app.post('/pending', userController.addPendingUser);
  app.post('/token', userController.decodeToken);
  app.post('/locations', dataController.addLocation);
  app.post('/roomsusers', dataController.addRoomsAndUsers);
  app.post('/reservations', dataController.addReservation);
  app.post('/roomsreservations', dataController.getAllRoomsAndReservations);
  app.post('/alldata', dataController.getAllData);
};