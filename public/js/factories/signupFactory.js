angular.module('userFactory', [])
.factory('SignUpFactory', function($http) {
  var userSignIn = function(userData) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: { userData: userData }
    })
    .then(function(token){
      console.log(token, "string in factory Function");
      return token;
    });
  };

  var authenticationChecker = function(){
    return !!$window.localStorage.getItem('dibsToken');
  };

  return {
    signUpData : userSignIn,
    validToken: authenticationChecker 
  };

});
