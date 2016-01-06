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

angular.module('ui.bootstrap').controller('SignupController', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  	$scope.user = {};
    $scope.user.username = '';
    $scope.user.email = '';
    $scope.user.password = '';

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.signUp = function() {
      if($scope.user.username === '') {
        alert("Must Enter User Name");
      } else if($scope.user.email === '') {
        alert("Must Enter Valid Email");
      } else if($scope.user.password === '') {
        alert("Must Enter Password");
      } else {
        $state.go('dashboard');	
        SignUpFactory.signUpData($scope.user)
          .then(function(token) {
            $window.localStorage
            .setItem('dibsToken', token.data);
          });
      }
    };
});