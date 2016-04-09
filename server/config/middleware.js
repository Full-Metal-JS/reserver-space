const bodyParser = require('body-parser');
const joinPaths = require('path').join;
const utils = require('./utils');
const compression = require('compression');

module.exports = function(app, express) {
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(joinPaths(__dirname, '../../dist')));

  app.use('*', function(req, res) {
    res.status(404).send('404: Page not found');
  });

  app.use(utils.logError);
  app.use(utils.handleError);
};
