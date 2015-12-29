var express = require('express');

// initialize express

var app = express();

//http is for any network protocal

var server = require('http').createServer(app);

//checking to see if PORT# is defined otherwise use 3000

var port = process.env.PORT || 3000;

require('./config/routeconfig.js')(app, express);

  /*
  express.static is a function taking the path name as an argument
  takes care of entire client side
  */
  
app.use(express.static(__dirname +  "/../public"));


server.listen(port);
