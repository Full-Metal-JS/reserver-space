var userModel = require('./userModel.js');
var jwt = require('jwt-simple');
var Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));

module.exports = {
  signup: function(req, res) {
    var storeUser = userModel.create.bind(userModel);
    //Since all mongoose functions are promises,
    //we need to set the this context of promise function.
    //creating promise to create new user

    var check = userModel.findOne.bind(userModel);
    //creating promise to check if user exists
    //only looking for this schema in the database

    check({ 'username' : req.body.userData.username })
      .then(function(user) {
        if(user){ 
          throw new Error('User Exists');
        } else {
          return storeUser(req.body.userData);
        }
      })
      .then(function(createdUser) {
        var token = jwt.encode(createdUser, 'WILDCARD');
        res.json(token);
      });
  },

  login: function(req, res) {
    var check = userModel.findOne.bind(userModel);

    check({ 'username': req.body.loginData.username,
        'password': req.body.loginData.password })
      .then(function(result) {
        if(result){
          return res.json({ result: true });
          //Users exists and password matches
            //pass them through. 
        } else {
          return res.json({ result: false });
          //Users info doesn't match
            //keep them on page.
      }
    });
  }
};
