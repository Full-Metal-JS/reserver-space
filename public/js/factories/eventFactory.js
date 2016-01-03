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

  var formatData = function(events){
    var eventsCollection = events.data,
        eventDates,
        formattedDate,
        eventTimes;

    eventsCollection.forEach(function(event){
      //dibs date
      eventDates = event.eventDate;
      formattedDate = moment(eventDates).format("dddd, MMMM Do YYYY");
      event.eventDate = formattedDate;
      //dibs time
      eventTimes = event.eventTime;
      formattedTime = moment(eventTimes).local().format('h:mmA');
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
