var express = require('express');

// initialize express
var app = express();

// TODO: add DB hookup

require('./config/middleware.js')(app, express);

module.exports = app;

