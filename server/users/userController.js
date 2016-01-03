var userModel = require('./userModel.js');
var jwt = require('jwt-simple');
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));

module.exports = {
  signup: function(req, res) {
    var storeUser = userModel.create.bind(userModel);
    //creating promise to create new user

    var check = userModel.findOne.bind(userModel);
    //creating promise to check if user exists
    //only looking for this schema in the database

    check({ 'username' : req.body.userData.username })
      .then(function(user){
        console.log("User in then", user);
        if(user){ 
          throw new Error('User Exists');
        } else {
          return storeUser(req.body.userData);
        }
      })
      .then(function(createdUser){
        console.log("CreatedUser in token", createdUser);
        var token = jwt.encode(createdUser, 'WILDCARD');
        res.json(token);
      })
      // .catch(function(err){
      //   console.log(err, "error in catch in userController");
      //   res.status(404).send(err.message);
      // });
  },

  login: function(req, res) {
    res.send(200);
  }

};
