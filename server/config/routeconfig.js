var bodyParser = require('body-parser');
var path = require('path');
var helpers = require('./helpers.js');
var utility = require(__dirname + '/../utility/utility.js');

module.exports = function(app, express) {
  var userRouter = express.Router();
  var eventRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../../public')));

  app.use('/api/users', userRouter);
  app.use('/api/events', eventRouter);
  app.use('*', function(req, res) {
    res.status(404).send('404: Page not found');
  });

  require(__dirname + '/../db/routes/index.js')(userRouter);
  require(__dirname + '/../events/eventRoutes.js')(eventRouter);
};
