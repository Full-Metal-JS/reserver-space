//parent module
// inject children modules for access
angular.module('reserverSpace', [
  'ui.router',
  'ngAnimate',
  'ui.bootstrap',
  'landing',
  'signup', 
  'signin', 
  'events', 
  'eventsInfoFactory', 
  'userFactory', 
  'userloginFactory',
  'navbarDirectives'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
  $httpProvider.interceptors.push('AttachToken');

  $stateProvider 
    .state('landing', {
      url: '/',
      templateUrl: 'views/landing.html',
      controller: 'LandingController'
    })
    .state('signin', {
      url : '/signin', 
      templateUrl : 'views/signin.html',
      controller : 'SigninController'
    })
    .state('signup', {
      url : '/signup', 
      templateUrl : 'views/signup.html',
      controller : 'SignupController'
    })
    .state('dashboard', {
      url : '/dashboard',
      templateUrl : 'views/dashboard.html',
      controller : 'EventsController',
      authenticate: true 
    })
    .state('dashboard.events', {
      url : '/events',
      templateUrl : 'views/eventListEmbedded.html',
      controller : 'EventsController',
      authenticate: true 
    });
})

.factory('AttachToken', function($window) {
  return { 
    request : function(http) {
      var token = $window.localStorage.getItem('dibsToken');
      if (token) {
        http.headers["x-access-token"] = token;
      }
      http.headers["Allow-Control-Allow-Origin"] = "*";
      return http;
    }
  };
})

.run(function($state, $rootScope, SignUpFactory) {
  $rootScope.$state = $state;

  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if(toState.authenticate === true && !SignUpFactory.validToken) {
      $state.go('landing');
      event.preventDefault();
    }
  });
});
