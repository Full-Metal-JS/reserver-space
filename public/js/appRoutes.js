//parent module
// inject children modules for access
angular.module('dibs', ['ngAnimate', 'ui.bootstrap','ui.router','eventsInfo', 'eventsInfoFactory', 'userInfo', 'userFactory'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('signup');
    $httpProvider.interceptors.push('AttachToken');
    //runs before reaching server and 
    //pushes the result of what we have defined with factory function

    $stateProvider 
      .state('signupPage', {
        url : '/signup', 
        views: {
          'indexPage' : {
            templateUrl : 'views/signup.html',
            controller : 'userSignUp'
          }         
        },
        data : { authenticate: false }
      })
      .state('dashboardPage', {
        url : '/dashboard',
        views: {
          'indexPage' : {
            templateUrl : 'views/dashboard.html',
            controller : 'eventsController'
          }
        },
        data : { authenticate: true }
      })
      .state('dashboardPage.events', {
        url : '/events',
        templateUrl : 'views/eventListEmbedded.html',
        controller : 'eventsController',
        data : { authenticate: true }
      });
    })
  
  .factory('AttachToken', function($window) {
    return { 
      request : function(http) {
        var token = $window.localStorage.getItem('dibsToken');
        if(token) {
        http.headers["x-access-token"] = token;
        }
        http.headers["Allow-Control-Allow-Origin"] = "*";
        return http;
      }
    };
  })
  
  .run(function($state, $rootScope, SignUpFactory) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if(toState.data.authenticate === true && !SignUpFactory.validToken) {
        $state.go('signupPage');
        event.preventDefault();
      }
    });
  });


         
