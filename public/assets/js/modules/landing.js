angular.module('landing', ['ngAnimate', 'ui.bootstrap'])
  .controller('LandingController', function ($scope, $uibModal, $log) {
    $scope.animationsEnabled = true;

    $scope.open = function (size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modal.html',
        controller: 'AuthController',
        size: size
      });
    };
});