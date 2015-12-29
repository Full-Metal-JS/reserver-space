angular.module('eventsInfo', [])
  .controller('eventsController', function($scope, Eventstored) {
    $scope.eventDate = '';
    $scope.eventToBook = '';
    $scope.roomName = '';
    $scope.eventAlert = '';
    // For boolean or non typed events do I still use ''

    $scope.finalizeEvent = function(){
      Eventstored.eventData($scope.eventDate, $scope.eventToBook, $scope.roomName, $scope.eventAlert);
    };
});


