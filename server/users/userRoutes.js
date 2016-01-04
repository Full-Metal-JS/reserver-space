var userController = require('./userController.js');

module.exports = function(app) {
  
    /*
    define those end points
    bind those endpoints to a function
    */
  app.post('/signup', userController.signup);

  app.post('/login', userController.login);
};
