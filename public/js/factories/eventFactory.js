angular.module('eventsInfoFactory', [])
.factory('Eventstored', function($http) {
  var eventData = function(data) {
    $http({
      method: 'POST',
      url: '/tbd',
      data: data
    });
  };

  return {
    eventData : eventData
  };

});
