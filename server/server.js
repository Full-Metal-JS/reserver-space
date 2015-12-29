var express = require('express');

// initialize express
var app = express();

// TODO: add DB hookup
//http is for any network protocal
var server = require('http').createServer(app);

//http is for any network protocal
var port = process.env.PORT || 3000;

//checking to see if PORT# is defined otherwise use 3000
require('./config/routeconfig.js')(app, express);

app.use(express.static(__dirname +  "/../public"));
  //express.static is a function taking the path name as an arugment
  //takes care of entire client side

server.listen(port);

//Uncessary since because we are passing app and express on line 14
// module.exports = app;

