var express = require('express');
var app = express();

require('./config/routeconfig.js')(app, express);

module.exports = app;
