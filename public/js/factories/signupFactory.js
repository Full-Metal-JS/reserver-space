angular.module('userFactory', [])
.factory('SignUpFactory', function($http) {
  var userSignIn = function(userData) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: userData
    });
  };

  return {
    signUpData : userSignIn
  };

});
