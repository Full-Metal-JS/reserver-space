'use strict';
require('dotenv').config();

const bodyParser = require('body-parser');
const joinPaths = require('path').join;
const utils = require('./utils');
const compression = require('compression');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const flash = require('flash');
const history = require('connect-history-api-fallback');
const logger = require('morgan');

module.exports = function(app, express) {
  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('./../../webpack.config');
    const compiler = webpack(webpackConfig);
    const { webpackDevMiddleware, webpackHotMiddleware } = require('./webpackDev');
    app.use(webpackDevMiddleware(webpackConfig, compiler));
    app.use(webpackHotMiddleware(compiler));  
  }
  
  const { Router } = express;
  let authRouter = Router();
  let router = Router();
  // compression middleware to lower the size of request and response
  app.use(compression());
  app.use(logger('dev'));
  // app.use(history());
  // body parser for all url encoded requests and json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // express sessions using redis as the session store
  app.use(session({
    store: new RedisStore({
      url: process.env.REDIS_URL
    }),
    secret: 'i dont have a secret',
    resave: true,
    saveUninitialized: true
  }));

  // flash middleware
  app.use(flash());

  // apply passport middleware
  require('./../passport')(app, passport);

  // sending static files
  app.use(express.static(joinPaths(__dirname, '../../dist')));

  app.use('/auth', authRouter);
  app.use('/api', router);

  require('./../routes/authRoutes')(authRouter);
  require('./../routes/routes')(router);

  // catch all
  app.use('*', function(req, res) {
    res.status(200).sendFile(joinPaths(__dirname, '../../dist/index.html')); //responds with index.html on browser refresh
  });

  // error logging and handling
  app.use(utils.logError);
  app.use(utils.handleError);
};
