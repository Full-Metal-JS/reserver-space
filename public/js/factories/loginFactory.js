angular.module('userloginFactory', [])
.factory('LoginFactory', function($http) {
  var userLoginIn = function(loginData) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: { loginData: loginData }
      //using object so that data is organized and 
      //we don't have to access every value we want on the server side
    });

  //   .then(function(token) {
  //     console.log(token, "string in factory Function");
  //     return token;
  //   });
  };

  // var authenticationChecker = function() {
  //   return !!$window.localStorage.getItem('dibsToken');
  // };

  return {
    userLoginIn : userLoginIn,
    // validToken: authenticationChecker 
  };
});
