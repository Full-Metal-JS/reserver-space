angular.module('signup', [])
  .controller('SignupController', function($scope, $window, $state,$uibModalInstance, SignUpFactory, LoginFactory) {
    $scope.user = {};
    $scope.user.email = '';
    $scope.user.password = '';

    $scope.signUp = function() {
      if($scope.user.email === '') {
        alert("Must Enter Valid Email");
      } else if($scope.user.password === '') {
        alert("Must Enter Password");
      } else {
        $uibModalInstance.dismiss()
        $state.go('dashboard');	
        SignUpFactory.signUpData($scope.user)
          .then(function(token) {
            $window.localStorage
            .setItem('dibsToken', token.data);

          });

      }
    },

    // $scope.loginPage = function() {
    //   console.log("login clicked")
    //   console.log($scope.user.email)
    //   // $state.go('signin');      
    // };

    $scope.login = function() {
      if($scope.user.email === '') {
        alert("Must Enter User Name");
      } else if($scope.user.password === '') {
        alert("Must Enter Password");
      } else {
        LoginFactory.userLoginIn($scope.user)
        $uibModalInstance.dismiss()
          .then(function(finalResult) {
            console.log(finalResult)
            if(finalResult.data.result){
              $state.go('dashboard'); 
            } else {
              alert("Incorrect Username or Password");              
            }
          });
      }
    };
});
