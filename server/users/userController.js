module.exports = {
	
  signup: function(req, res) {
    
    /*
    This should be the entire data from the post request
      If users exists then login
        else stay at signup page
      else redirect to login page
    */
  
    console.log(req.body);
    res.send(200);
  },

  login: function(req, res) {
    res.send(200);
  }

};
