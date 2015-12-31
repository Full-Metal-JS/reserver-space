angular.module('eventsInfoFactory', [])
.factory('Eventstored', function($http) {
  var eventData = function(data) {
    return $http({
      method: 'POST',
      url: '/api/events/booked',
      data: data
    });
  };

  return {
    eventData : eventData
  };
  //5 what do we do with this page?
});
