angular.module('userloginFactory', [])
.factory('LoginFactory', function($http) {
  var userLoginIn = function(loginData) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: { loginData: loginData }
    })
    .then(function(val) {
      return val;
    });
  };

  // var authenticationChecker = function() {
  //   return !!$window.localStorage.getItem('dibsToken');
  // };

  return {
    userLoginIn : userLoginIn,
    // validToken: authenticationChecker 
  };
});
