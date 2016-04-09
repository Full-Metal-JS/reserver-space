var express = require('express');
var app = express();

require('./routeconfig.js')(app, express);

module.exports = app;
