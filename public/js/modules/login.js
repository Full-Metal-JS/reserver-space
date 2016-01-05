angular.module('loginInfo', [])
  .controller('userLogin', function($scope, $window, $state, LoginFactory) {
    $scope.loginUser = {};
    $scope.loginUser.username = '';
    $scope.loginUser.password = '';

    $scope.login = function() {
      if($scope.loginUser.username === '') {
        alert("Must Enter User Name");
      } else if($scope.loginUser.password === '') {
        alert("Must Enter Password");
      } else {
        LoginFactory.userLoginIn($scope.loginUser)
          .then(function(finalResult) {
            if(finalResult.data.result){
              $state.go('dashboardPage'); 
            } else {
              alert("Incorrect Username or Password");              
            }
          });
      }
    };
})
