angular.module('authFactory', [])
.factory('AuthFactory', function($http, $window, $state) {
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(res) {
      return res.data;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function(res) {
      return res.data.token;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('space.reserver');
  };

  var signout = function () {
    //User.clearUser();
    $window.localStorage.removeItem('space.reserver');
    $state.go('landing');
  };

  return {
    signup : signup,
    signin : signin,
    signout: signout,
    isAuth: isAuth 
  };
});
