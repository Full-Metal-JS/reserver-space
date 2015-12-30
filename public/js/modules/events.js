angular.module('eventsInfo', [])
  .controller('eventsController', function($scope, $state, Eventstored) {
    $scope.eventDate = '';
    $scope.eventToBook = '';
    $scope.roomName = '';
    $scope.eventAlert = '';

    $scope.finalizeEvent = function(){
      Eventstored.eventData($scope.eventDate, $scope.eventToBook, $scope.roomName, $scope.eventAlert);
    };

    $scope.renderSideDashboard = function(){
        $state.go('dashboardPage.events');
    };
});
