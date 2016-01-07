angular.module('auth', [])
  .controller('AuthController', function($scope, $window, $state, $uibModalInstance, AuthFactory) {
    $scope.error = null;

    $scope.signup = function() {
      AuthFactory.signup($scope.user)
        .then(function(token) {
          $window.localStorage.setItem('space.reserver', token);
          $uibModalInstance.dismiss();
          $state.go('dashboard');
        })
        .catch(function (error) {
          $scope.error = error;
          console.error(error);
        });
    },

    $scope.signin = function() {
      AuthFactory.signin($scope.user)
        .then(function (user) { 
          // User.data = user;

          $window.localStorage.setItem('space.reserver', user.token);
          $uibModalInstance.dismiss();
          $state.go('dashboard');
        })
        .catch(function (error) {
          $scope.error = error;
          console.error(error);
        });
    };
});
