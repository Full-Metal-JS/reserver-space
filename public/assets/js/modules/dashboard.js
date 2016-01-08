angular.module('dashboard', [])
  .controller('DashboardController', function($scope, UserFactory) {
    $scope.locations = (UserFactory.currentUser.data.locations !== undefined) ? 
                        UserFactory.currentUser.data.locations : [];

    $scope.addbar = {
      text: '',
      placeholder: 'Add location'
    };

    $scope.addLocation = function() {
      UserFactory.addLocation($scope.addbar.text)
        .then(function(location) {
          console.log('location: ', location);

          $scope.locations.push(location);
          $scope.addbar.text = '';
          //$scope.alerts.push({type: 'success', msg: 'Your preferences have been saved!'});
        })
        .catch(function(error) {
          //$scope.alerts.push({type: 'danger', msg: 'Error saving preferences.'});
          console.error('Error adding location: ', error);  
        });
    };
  });


