//parent module
// inject children modules for access
angular.module('dibs', ['ngAnimate', 'ui.bootstrap','ui.router','eventsInfo', 'eventsInfoFactory', 'userInfo', 'userFactory'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('signup');

    $stateProvider 
      .state('signupPage', {
        url : '/signup', 
        views: {
          'indexPage' : {
            templateUrl : 'views/signup.html',
            controller : 'userSignUp'
          }         
        }
      })
      .state('dashboardPage', {
        url : '/dashboard',
        views: {
          'indexPage' : {
            templateUrl : 'views/dashboard.html',
            controller : 'eventsController'
          }
        }
      })
      .state('dashboardPage.events', {
        url : '/events',
          templateUrl : 'views/eventListEmbedded.html',
          controller : 'eventsController'
      });
});


         
