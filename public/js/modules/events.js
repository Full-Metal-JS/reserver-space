angular.module('eventsInfo', [])
  .controller('eventsController', function($scope, Eventstored) {
    $scope.eventDate = '';
    $scope.eventToBook = '';
    $scope.roomName = '';
    $scope.eventAlert = '';

    $scope.finalizeEvent = function(){
      Eventstored.eventData($scope.eventDate, $scope.eventToBook, $scope.roomName, $scope.eventAlert);
    };
});


