var jwt = require('jwt-simple');

module.exports = {
  decode: function(req, res, next){
    var token = req.headers["x-access-token"];
    if(!token){
      return res.status(404).end();
    }
    try{ var user = jwt.decode(token, 'WILDCARD');
      req.user = user;
      next();
    } 
    catch(err){ 
      return next(err);
    }
  }
};
