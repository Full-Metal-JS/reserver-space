
angular.module('dashboard', ['ngAnimate', 'ui.bootstrap'])
    .controller('DashboardController', function($scope,$uibModal, UserFactory) {
        $scope.locations = (UserFactory.currentUser.data.locations !== undefined) ?
          UserFactory.currentUser.data.locations : [];

        $scope.addbar = {
            text: '',
            placeholder: 'Add location'
        };

        $scope.currentLocation = $scope.locations[0];
        $scope.currentReservations = [];
        // $scope.currentRoom = [];

        $(".main").on('click', ".dropdown-menu li a", function() {
            console.log("clicked")
            $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
            $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
        });

        // $scope.selectedRoom = function() {

        // }

        $scope.selectedLocation = function(index) {
            $scope.currentReservations = []
            $scope.currentLocation = $scope.locations[index]
            console.log("was run")
            angular.forEach($scope.currentLocation.rooms, function(index) {
                console.log("reservations: ", index)
                angular.forEach(index.reservations, function(index) {
                    console.log("index: ", index)
                    $scope.currentReservations.push(index)
                })
            })
        }

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

        $scope.open = function (size) {
          var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'addModal.html',
                controller: 'DashboardController',
                size: size
            });
        };

        $scope.openCal = function(){
          $scope.popupCal.opened = true;
        };

        $scope.popupCal = {
          opened: false
        };

        $scope.addUserInput = ""
        $scope.addRoomInput = ""
        $scope.addRoom = function(){
            console.log($scope.addUserInput)
            console.log($scope.addRoomInput)
            console.log("it worked")
        }
    });
