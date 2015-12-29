//parent module
// inject children modules for access
angular.module('dibs', ['ngRoute','eventsInfo', 'eventsInfoFactory', 'userInfo', 'userFactory'])
  .config(function($routeProvider){
    $routeProvider
      .when('/dashboard', {
        templateUrl : 'views/dashboard.html',
        controller : 'eventsController'
      })
      
      // .when('/login', {
      //   templateUrl : 'public/views/login.html',
      //   controller :
      // })

      .when('/signup', {
        templateUrl : 'views/signup.html',
        controller : 'userSignUp'
      });
      // .otherwise('/signup');
});
