module.exports = {
  // send error to middleware
  errorLogger: function(error, req, res, next) {
    console.error(error.stack);
    next(error);
  },

  // send error to client
  errorHandler: function(error, req, res, next) {
    res.status(500).send({error: error.message});
  },
};