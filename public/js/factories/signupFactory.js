angular.module('userFactory', [])
.factory('SignUpFactory', function($http) {
  var userSignIn = function(userData) {
    $http({
      method: 'POST',
      url: '/tbd',
      data: userData
   });
  };

  return {
    signUpData : userSignIn
  };

});
