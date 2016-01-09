
angular.module('dashboard', ['ngAnimate', 'ui.bootstrap'])
    .controller('DashboardController', function($scope,$uibModal, UserFactory,moment) {
        $scope.locations = (UserFactory.currentUser.data.locations !== undefined) ?
          UserFactory.currentUser.data.locations : [];

        $scope.addbar = {
            text: '',
            placeholder: 'Add location'
        };

        $scope.currentLocation = $scope.locations[0];
        $scope.currentReservations = [];
        // $scope.currentRoom = [];

        //change the drop down and sets the selected room in scope
        $(".main").on('click', ".dropdown-menu#room li a", function() {
            $scope.roomInput = this.text

            $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
            $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
        });

        //change the drop down and sets the selected time in scope
        $(".main").on('click', ".dropdown-menu#time li a", function() {
            $scope.timeInput = this.text
            $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
            $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
        });

        $scope.roomInput = ""
        $scope.calendarInput = ""
        $scope.timeInput = ""
        $scope.resDescInput = ""
        $scope.confirmReservation = function(){
            var date =  $scope.eve.eventDate
            var formatted = moment(date).format('D-MM-YYYY');
            // $scope.calendarInput = $scope.eve.eventDate || ""

            console.log($scope.resDescInput)
            console.log($scope.roomInput)
            console.log(formatted)
            console.log($scope.currentLocation.locationName)
            console.log($scope.timeInput)
        }

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
            $scope.addLocation();
        };

        $scope.openCal = function(){
          $scope.popupCal.opened = true;
        };

        $scope.popupCal = {
          opened: false
        };

        $scope.addUserInput = "";
        $scope.addRoomInput = "";

        $scope.addRoomsUsers = function(){
          var usersList = $scope.addUserInput.split(',');
          var roomsList = $scope.addRoomInput.split(',');

          UserFactory.addRoomsAndUsers($scope.currentLocation.id, usersList, roomsList);
        }
    });
