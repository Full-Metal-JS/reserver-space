var jwt = require('jwt-simple');

module.exports = {
  logError: function(err, req, res, next) {
    console.error(err.stack);
    next(err);
  },
  handleError: function(err, req, res) {
    res.status(500).send({error: err.message});
  },
  decode: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.status(403).send();
    }
    try {
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
};
