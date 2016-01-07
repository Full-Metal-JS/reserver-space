var models = require('../models');
var locationController = require('../controllers/locationController.js');

module.exports = function(app) {
  app.post('/locations');
}