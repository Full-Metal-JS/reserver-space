angular.module('userFactory', [])
  .factory('UserFactory', ['$http', function($http) {
    var user = {};

    user.currentUser = {};

    user.savelocation = function (location) {
      return $http({
        method: 'POST',
        url: '/api/users/locations',
        data: location
      })
      .then(function (res) {
        return res.data;
      }, function (res) {
        console.error('Error: ', res);
      });
    };

    user.clearUser = function () {
      user.currentUser = {};
    };

    return user;
  }]);