angular.module('navbarDirectives', [])
  .directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: './views/_navbar.html',
      controller: function($scope, $rootScope) {
        $rootScope.isNavbarCollapsed = true;
      }
    };
  });