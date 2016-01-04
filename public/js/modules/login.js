angular.module('loginInfo', [])
  .controller('userLogin', function($scope, $window, $state) {
    $scope.loginUser = {};
    $scope.loginUser.username = '';
    $scope.loginUser.password = '';

    $scope.login = function() {
      //need to check if user exists

      if($scope.loginUser.username === '') {
        alert("Must Enter User Name");
      } else if($scope.loginUser.password === '') {
        alert("Must Enter Password");
      } else {
        $state.go('dashboardPage'); 
        loginFactory.signUpData($scope.loginUser)
          .then(function(token) {
            $window.localStorage
            .setItem('dibsToken', token.data);
          });
      }
    };
})
