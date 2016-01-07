angular.module('navbarDirectives', ['ngAnimate', 'ui.bootstrap'])
  .directive('navbar', ['AuthFactory', function(AuthFactory) {
    return {
      restrict: 'E',
      templateUrl: './views/_navbar.html',
      controller: function($scope, $rootScope, $uibModal) {
        $rootScope.isNavbarCollapsed = true;
        $scope.animationsEnabled = true;

        $scope.isLoggedIn = AuthFactory.isAuth;
        $scope.signout = AuthFactory.signout;
        
        $scope.open = function(size) {
          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modal.html',
            controller: 'AuthController',
            size: size
          });
        }
      }
    }
  }]);