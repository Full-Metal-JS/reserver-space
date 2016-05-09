const { signup, login, logout, updateSession,
  facebook, facebookCallback, validateFacebook, 
  google, googleCallback, validateGoogle
} = require('./../controllers/authController');

const authRouteConfig = (router) => {
  router.post('/signup', signup, updateSession);
  
  router.post('/login', login, updateSession);
  
  router.get('/logout', logout);

  router.get('/facebook', facebook);

  router.get('/facebook/callback', facebookCallback, validateFacebook);

  router.get('/google', google);

  router.get('/google/callback', googleCallback, validateGoogle);
};

module.exports = authRouteConfig;