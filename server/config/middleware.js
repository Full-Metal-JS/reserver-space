'use strict'
require('dotenv').config();

const bodyParser = require('body-parser');
const joinPaths = require('path').join;
const utils = require('./utils');
const compression = require('compression');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');

module.exports = function(app, express) {
  let authRouter = express.Router();
  // compression middleware to lower the size of request and response
  app.use(compression());
  
  // body parser for all url encoded requests and json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  // express sessions using redis as the session store
  app.use(session({
    store: new RedisStore({
      url: process.env.REDIS_URL,
    }),
    secret: 'i dont have a secret',
    resave: true,
    saveUninitialized: true
  }));
  
  // apply passport middleware
  require('./../passport')(app, passport);
  
  // sending static files
  app.use(express.static(joinPaths(__dirname, '../../dist')));
  
  app.use('/auth', authRouter);
  
  require('./../routes/authRoutes')(authRouter);

  // catch all
  app.use('*', function(req, res) {
    res.status(404).send('404: Page not found');
  });
  
  // error logging and handling
  app.use(utils.logError);
  app.use(utils.handleError);
};
