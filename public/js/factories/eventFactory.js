angular.module('eventsInfoFactory', [])
.factory('Eventstored', function($http) {
  //posts events to database
  var eventData = function(dibEvent) {
    return $http({
      method: 'POST',
      url: '/api/events/booked',
      data: { dibEvent : dibEvent }
    }).then(function(responseObj){
      console.log(responseObj);
      return responseObj;
    });
  };

  //retrieves events
  var getData = function() {
    return $http({
      method: 'GET',
      url: '/api/events/events'
    });
  };

  var formatData = function(events){
    var eventsCollection = events.data,
        eventDates,
        formattedDate,
        eventTimes;

    eventsCollection.forEach(function(event){
      eventDates = event.eventDate;
      formattedDate = moment(eventDates).format("dddd, MMMM Do YYYY");
      formattedTime = moment(eventDates).format('h:mmA');
      event.eventDate = formattedDate;
      event.eventTime = formattedTime;
    });

    return eventsCollection;

  };

  return {
    eventData : eventData,
    getData : getData,
    formatData : formatData
  };
});
