const Auth = require('./../controllers/authController');

const authRouteConfig = (router) => {
  router.post('signup', Auth.signup);
  
  router.post('login', Auth.login);
  
  router.get('logout', Auth.logout);
};

module.exports = authRouteConfig;