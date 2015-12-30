//parent module
// inject children modules for access
angular.module('dibs', ['ui.router','eventsInfo', 'eventsInfoFactory', 'userInfo', 'userFactory'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/signup');

    $stateProvider 
      .state('signupPage', {
        url : '/', 
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
          templateUrl : 'views/login.html',
          controller : 'eventsController'
      });
});


         
