var roomController = require('./userController.js');

module.exports = function(app) {
    //define those end points
    //bind those endpoints to a function


	 app.post('/', function (req, res) {
    // TODO: change res.end to point to your ap directory
    /**
     * something like:
     * res.end('../../app/');
     */
    // res.end();
  });

  app.post('/signup', function(req, res){
    var testing =  req.body.user;
    // This should be the entire data from the post request
      //If users exists then login
        //else stay at signup page
      //else redirect to login page
  });

  app.post('/login', function(req, res){
    //If password and username match
      //load dashboard
  });
  
};
