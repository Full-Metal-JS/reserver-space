angular.module('dashboard', [])
  .controller('DashboardController', function($scope, UserFactory) {

    $scope.locations = UserFactory.data.data.locations;

    console.log('locations: ', UserFactory.data.data.locations);
});


