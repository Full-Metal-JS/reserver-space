
angular.module('navbarDirectives', ['ngAnimate', 'ui.bootstrap'])
    .directive('navbar', function() {
        return {
            restrict: 'E',
            templateUrl: './views/_navbar.html',
            controller: function($scope, $rootScope, $uibModal) {
                $rootScope.isNavbarCollapsed = true;
                $scope.animationsEnabled = true;
                $scope.open = function(size) {
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'myModalContent.html',
                        controller: 'SignupController',
                        size: size,
                        resolve: {
                            items: function() {
                                return $scope.items;
                            }
                        }
                    });
                }
            }
        }
    });