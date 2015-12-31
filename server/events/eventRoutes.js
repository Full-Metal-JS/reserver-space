var eventController = require('./eventController.js');

module.exports = function(app) {
  //define those end points
  //bind those endpoints to a function
  app.post('/booked', eventController.postEvent);
  //7-8?
};
