angular.module('eventsInfo', [])
  .constant('moment', moment)
  .controller('eventsController', function($scope, $state, Eventstored, moment) {
    $scope.eve = {};
    $scope.eve.eventDate = '';
    $scope.eve.eventDescription = '';
    $scope.eve.eventAlert = '';
    $scope.eve.eventTime = '';
    $scope.eve.roomName = '';
    $scope.eve.houseName = 'Hacker House';

    $scope.renderSideDashboard = function(){
      $state.go('dashboardPage.events');

      Eventstored.getData().then(function(events){
        var formattedEvents = Eventstored.formatData(events);
        $scope.bookedEvents = formattedEvents;
      });
    };

    $scope.eventSubmit = function(){
      var $events = $scope.eve;
      Eventstored.eventData($events)
      .then(function(message){
        if(!message.data.result){
          alert('Someone else called Dibs!');
        }
      });
      Eventstored.getData();
      $scope.renderSideDashboard();
    };

    //TIME ADDON
    $scope.eve.eventDate = new Date();
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = $scope.eve.eventDate;
      d.setHours( 15 );
      d.setMinutes( 0 );
      // $scope.eve.eventDate = d;
    };

    // used to help render the date
    $scope.dt = + new Date();

    $scope.today = function() {
    $scope.eve.eventDate = new Date();
    };

    $scope.today();

    $scope.clear = function () {
      $scope.eve.eventDate = null;
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.eve.eventDate = new Date(year, month, day);
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =[{
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);
        for (var i=0;i<$scope.events.length;i++){
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    };
  });
