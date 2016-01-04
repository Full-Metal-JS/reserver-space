angular.module('userInfo', [])
  .controller('userSignUp', function($scope, $window, $state, SignUpFactory) {
    $scope.user = {};
    $scope.user.username = '';
    $scope.user.email = '';
    $scope.user.password = '';

    $scope.signUp = function(){
      $state.go('dashboardPage');	
      SignUpFactory.signUpData($scope.user)
        .then(function(token){
          $window.localStorage
          .setItem('dibsToken', token.data);
        });
    };
});
