var express = require('express');
var app = express();
var models = require('./db/models');

var server = require('http').createServer(app);

var port = process.env.PORT || 4000;
app.set('port', port);

//checking to see if PORT# is defined otherwise use 3000



require('./config/routeconfig.js')(app, express);

  /*
  express.static is a function taking the path name as an argument
  takes care of entire client side
  */
  
app.use(express.static(__dirname +  "/../public"));

models.sequelize.sync().then(function() {
  server.listen(port, function() {
    console.log('server running on port: ', port);
  });
});

