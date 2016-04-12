const Auth = require('./../controllers/authController');

const authRouteConfig = (router) => {
  router.post('/signup', Auth.signup, Auth.updateSession);
  
  router.post('/login', Auth.login, Auth.updateSession);
  
  router.get('/logout', Auth.logout);
};

module.exports = authRouteConfig;