var bodyParser = require('body-parser'),
    helpers = require('./helpers.js');



module.exports = function(app, express) {
  app.get('/', function (req, res) {
    // TODO: change res.end to point to your ap directory
    /**
     * something like:
     * res.end('../../app/');
     */
    res.end('<h1>roomTap...using express</h1>');
  });

  app.get('/kitchen', function (req, res) {
    res.end('<h1>kitchen</h1>');
  });

  app.get('/familyRoom', function (req, res) {
    res.end('<h1>familyRoom</h1>');
  });

  app.get('/pillowRoom', function (req, res) {
   res.end('<h1>pillowRoom, ooo la la</h1>');
  });

  // TODO: require('../rooms/roomRoutes.js');
};