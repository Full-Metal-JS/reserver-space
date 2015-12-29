angular.module('userInfo', [])
  .controller('userSignUp', function($scope, SignUpFactory) {
    $scope.user.firstName = '';
    $scope.user.lastName = '';
    $scope.user.email = '';
    $scope.user.password = '';

    $scope.signUp = function(){
      SignUpFactory.signUpData($scope.user);
    };
});
