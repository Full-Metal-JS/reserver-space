angular.module('dashboard', ['ngAnimate', 'ui.bootstrap', 'angular-jwt'])
    .controller('DashboardController', function($scope,$uibModal, jwtHelper, UserFactory,moment, $state, $window) {

        $scope.currentUser = jwtHelper.decodeToken($window.localStorage.getItem('space.reserver'));

        $scope.addbar = {
            text: '',
            placeholder: 'Add location'
        };

        $scope.currentLocation;
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
            var formatted = moment(date).format('DD/MM/YYYY');
            // $scope.calendarInput = $scope.eve.eventDate || ""

            var timeFormatted = function(time){
                var momentObj = moment(time, ["h:mm A"])
                var formattedTime = momentObj.format("HH:mm")
                return formattedTime
            }

            var AddHour = function(time){
                var momentObj = moment(time, ["h:mm A"])
                var newHour = momentObj.add(1,'hour')
                var formattedTime = momentObj.format("HH:mm")
                return formattedTime
            }
            var theRoomId = $scope.roomInput.split(":")
            var roomId = Number(theRoomId[1])
            var startTime = timeFormatted($scope.timeInput)
            var endTime = AddHour($scope.timeInput)
            var reservationName = $scope.resDescInput
            var locId = $scope.currentLocation.id
            // console.log($scope.resDescInput)
            // console.log($scope.roomInput)
            // console.log(formatted)
            // console.log($scope.currentLocation.locationName)
            // console.log($scope.timeInput)
            var resObj = {
                date: date,
                reservationName : reservationName,
                startTime : startTime,
                endTime : endTime,
                roomId : roomId,
                locId : locId
            }
            // resObj.reservationName = 
             
             // console.log(endTime)
            // $scope.currentReservations = UserFactory.addReservation(locId,roomId,startTime,endTime,reservationName)
            UserFactory.addReservation(locId, roomId, startTime, endTime, reservationName, date, $scope.currentUser.id)
              .then(function(data) {
                // console.log('this is when i try to add a reservations : ', data);
                $scope.currentReservations.push(data);
              });
            
        }

        $scope.selectedLocation = function(index) {
            $scope.currentReservations = [];
            console.log('scope.location selected', $scope.locations[index]);
            $scope.currentLocation = $scope.locations[index];
            
            UserFactory.getAllRoomsAndReservations($scope.currentLocation.id)
              .then(function(reservations) {
                console.log(reservations);
                $scope.currentReservations = reservations.reservations;
              });

            // console.log(test)
            angular.forEach($scope.currentLocation.rooms, function(index) {
                // console.log("reservations: ", index)
                angular.forEach(index.reservations, function(index) {
                    // console.log("index: ", index)
                    $scope.currentReservations.push(index);
                });
            });
        };

        $scope.addLocation = function() {
            console.log("this is addbar text: ",$scope.addbar.text)
            if ($scope.addbar.text === ""){
                alert("Add a locations")
                $scope.open('lg');
                return;
            }
            UserFactory.addLocation($scope.addbar.text)
                .then(function(location) {
                    console.log('location: ', location);

                    $scope.locations.push(location);
                    $scope.addbar.text = '';
                    $scope.currentLocation = location;
                    //$scope.alerts.push({type: 'success', msg: 'Your preferences have been saved!'});
                })
                .catch(function(error) {
                    //$scope.alerts.push({type: 'danger', msg: 'Error saving preferences.'});
                    console.error('Error adding location: ', error);
                });
        };

        $scope.open = function (size) {
          $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'addModal.html',
                controller: 'DashboardController',
                size: size,
                scope: $scope
            });
            if ($scope.addbar.text.length) {
                $scope.addLocation();
            }
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

          var usersList = $scope.addUserInput;
          var roomsList = $scope.addRoomInput;
          console.log(roomsList, usersList);

          UserFactory.addRoomsAndUsers($scope.currentLocation.id, usersList, roomsList)
            .then(function(response) {
                console.log(response);
                // $scope.currentLocation.rooms.push(roo
            });
          // $scope.currentLocation.rooms.push(addedRooms.$$state.value.addedRooms);
          // console.log($scope.currentLocation.rooms.push(location));

          $scope.modalInstance.close();
        };

        $scope.getAllData = function() {

          UserFactory.getAllData($scope.currentUser.id)
            .then(function(result) {
                $scope.locations = UserFactory.currentUser.data.locations;
                $state.go('dashboard');
            });
        };

        $scope.getAllRoomsAndReservations = function(locId) {
            UserFactory.getAllRoomsAndReservations(locId)
              .then(function(result) {
                // $scope.
                console.log('this is the result of getting all rooms and reserves: ', result);
                $state.go('dashboard');
              });
        };
    });
