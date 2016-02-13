//parent module
// inject children modules for access
angular.module('reserverSpace', [
  'ui.router',
  'ngAnimate',
  'ui.bootstrap',
  'angular-jwt',
  'landing',
  'auth', 
  'dashboard',
  'events', 
  'dashboardFactory',
  'eventsFactory', 
  'authFactory',
  'userFactory',
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
    .state('dashboard', {
      url : '/dashboard',
      templateUrl : 'views/dashboard.html',
      controller : 'DashboardController',
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
      var token = $window.localStorage.getItem('space.reserver');
      if (token) {
        http.headers["x-access-token"] = token;
      }
      http.headers["Allow-Control-Allow-Origin"] = "*";
      return http;
    }
  };
})

.run(function($state, $rootScope, AuthFactory) {
  $rootScope.$state = $state;

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    $rootScope.isNavbarCollapsed = true;

    if (toState && toState.authenticate && !AuthFactory.isAuth()) {
      event.preventDefault();
      $state.go('landing');
    } 
  });
});
