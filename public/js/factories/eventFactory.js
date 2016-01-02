angular.module('eventsInfoFactory', [])
.factory('Eventstored', function($http) {
  var eventData = function(data) {
    return $http({
      method: 'POST',
      url: '/api/events/booked',
      data: data
    });
  };

  var getData = function() {
    return $http({
      method: 'GET',
      url: '/api/events/events'
    });
  };

  return {
    eventData : eventData,
    getData : getData
  };
});
