var bodyParser = require('body-parser');
var helpers = require('./helpers.js');


module.exports = function(app, express) {
  //creating routes for each individual moduels (groups of routes)
  //require('./config/roomRouter.js')(app, express);
  var userRouter = express.Router();
  //any middle wear we want the router to have
  
  require(__dirname + '/../users/userRoutes.js')(userRouter);
  app.use('/api/users', userRouter);


  // app.get('/', function (req, res) {
  //   // TODO: change res.end to point to your ap directory
  //   /**
  //    * something like:
  //    * res.end('../../app/');
  //    */
  //    console.log("/");
  //   // res.end();
  // });

  // app.get('/kitchen', function (req, res) {
  //   // res.end();
  // });

  // app.get('/familyRoom', function (req, res) {
  //   // res.end();
  // });

  // app.get('/pillowRoom', function (req, res) {
  //  // res.end();
  // });

  // TODO: require('../rooms/roomRoutes.js');
};
