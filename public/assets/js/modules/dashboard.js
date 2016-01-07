angular.module('dashboard', [])
  .controller('DashboardController', function($scope, UserFactory) {
    $scope.locations = UserFactory.currentUser.data.locations;
  });


