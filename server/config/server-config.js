'use strict'

const express = require('express');
const applyMiddleware = require('./middleware');
const createServer = require('http').createServer;

let server = createServer();

let app = express();

applyMiddleware(app, express);

server.on('request', app);

module.exports = server;
