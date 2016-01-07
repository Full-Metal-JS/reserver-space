angular.module('userFactory', [])
  .factory('UserFactory', ['$http', function($http) {
    var user = {};

    user.data = {
      locations: {}
    };

    user.savelocations = function () {
      return $http({
        method: 'POST',
        url: '/api/users/locations',
        data: user.data
      })
      .then(function (res) {
        return res.data;
      }, function (res) {
        console.error('Error: ', res);
      });
    };

    user.clearUser = function () {
      user.data = {
        locations: {}
      };
    };

    return user;
  }]);