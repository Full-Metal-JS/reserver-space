angular.module('signup', [])
  .controller('SignupController', function($scope, $window, $state, SignUpFactory) {
    $scope.user = {};
    $scope.user.username = '';
    $scope.user.email = '';
    $scope.user.password = '';

    $scope.signUp = function() {
      if($scope.user.username === '') {
        alert("Must Enter User Name");
      } else if($scope.user.email === '') {
        alert("Must Enter Valid Email");
      } else if($scope.user.password === '') {
        alert("Must Enter Password");
      } else {
        $state.go('dashboard');	
        SignUpFactory.signUpData($scope.user)
          .then(function(token) {
            $window.localStorage
            .setItem('dibsToken', token.data);
          });
      }
    },

    $scope.loginPage = function() {
      $state.go('signin');      
    };
});
