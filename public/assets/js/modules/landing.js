angular.module('landing', ['ngAnimate', 'ui.bootstrap'])
  .controller('LandingController', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'SignupController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

// angular.module('ui.bootstrap').controller('SignupController', function ($scope, $uibModalInstance, items) {

//   $scope.items = items;
//   $scope.selected = {
//     item: $scope.items[0]
//   };
//   	$scope.user = {};
//     $scope.user.username = '';
//     $scope.user.email = '';
//     $scope.user.password = '';

//   $scope.ok = function () {
//     $uibModalInstance.close($scope.selected.item);
//   };

//   $scope.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };


// });