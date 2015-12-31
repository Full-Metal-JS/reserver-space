angular.module('userInfo', [])
  .controller('userSignUp', function($scope, $location, SignUpFactory) {
    $scope.user = {};
    $scope.user.firstName = '';
    $scope.user.lastName = '';
    $scope.user.email = '';
    $scope.user.password = '';

    $scope.signUp = function(){
        $location.path('/dashboard');	
        SignUpFactory.signUpData($scope.user);
    };
});
