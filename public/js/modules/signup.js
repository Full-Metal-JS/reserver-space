angular.module('userInfo', [])
  .controller('userSignUp', function($scope, $state, SignUpFactory) {
    $scope.user = {};
    $scope.user.firstName = '';
    $scope.user.lastName = '';
    $scope.user.email = '';
    $scope.user.password = '';

    $scope.signUp = function(){
        $state.go('dashboardPage');	
        SignUpFactory.signUpData($scope.user);
    };
});
