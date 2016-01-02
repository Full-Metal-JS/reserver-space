var eventController = require('./eventController.js');

module.exports = function(app) {
  app.post('/booked', eventController.postEvent);
  app.get('/events', eventController.getEvent);
};
