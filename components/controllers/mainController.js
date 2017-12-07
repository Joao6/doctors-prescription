'use strict'
angular.module('prescritor')
    .controller('mainController', function ($scope, $rootScope, $location, userService) {

        $scope.login = (user) => {
            //$location.path('/adm/home')
            /* if(user.email === 'adm@gmail.com'){
                $location.path('/adm/home')
            }else{
                $location.path('/prescritor/home')
            } */
            userService.validateLogin(user)
        }

        $scope.logout = () => {
            userService.logout()            
        }
    })