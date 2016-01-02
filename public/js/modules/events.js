angular.module('eventsInfo', ['ngAnimate', 'ui.bootstrap'])
  .controller('eventsController', function($scope, $state, $log, Eventstored) {
    $scope.eve = {};
    $scope.eve.eventDate = '';
    $scope.eve.eventToBook = '';
    $scope.eve.eventAlert = '';
    $scope.eve.eTime = '';
    $scope.eve.roomName = 'kitchen';

    $scope.eventSubmit = function(){
      Eventstored.eventData($scope.eve);
      
      Eventstored.getData()
      //[README] - DATA
      /**
        * Here, each 'event' a user books is accounted for & logged in the browser's console. 
        * This is currently our endpoint for the data being returned from the server.
        * Currently, our data is retrieved only when someone submits a new 'event' & 
        * every time that someone submits an event. This will need to change.
        *
        * We will need to change where we retrieve data & create a method to do so.
        * Finally, we will have to append it to one of our views.
        */
        .then(function(events){
          events.data.forEach(function(event){
            console.log(event);
          });
        });
    };

    $scope.renderSideDashboard = function(){
      $state.go('dashboardPage.events');
    };

    //TIME ADDON
    $scope.eve.eventTime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.eve.eventTime = d;
    };
    ///////////END/////////////

    ////////BUTTONS////////////
    // $scope.singleModel = 1;

    // $scope.radioModel = 'Middle';

    // $scope.checkModel = {
    //   left: false,
    //   middle: false,
    //   right: false
    // };

    $scope.$watchCollection('checkModel', function () {
      $scope.checkResults = [];

      angular.forEach($scope.checkModel, function (value, key) {
        if (value) {
          $scope.checkResults.push(key);
        }
      });
    });

    $scope.eve.roomName = [];
    $scope.$watchCollection('checkResults', function(){
      console.log('this fired!');
      $scope.eve.roomName = $scope.checkResults;
    });
    ////////////////////////////////

    $scope.today = function() {
    $scope.eve.eventDate = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.eve.eventDate = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
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
