var bodyParser = require('body-parser');
var helpers = require('./helpers.js');


module.exports = function(app, express) {
  app.use(bodyParser.json());
  
  //creating routes for each individual moduels (groups of routes)
  
  var userRouter = express.Router();
  require(__dirname + '/../users/userRoutes.js')(userRouter);
  app.use('/api/users', userRouter);

  var roomRouter = express.Router();
  require(__dirname + '/../rooms/roomRoutes.js')(roomRouter);
  app.use('/api/rooms', roomRouter);

  var eventRouter = express.Router();
  require(__dirname + '/../events/eventRoutes.js')(eventRouter);
  app.use('/api/events', eventRouter);

};
