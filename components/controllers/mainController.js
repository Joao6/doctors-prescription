'use strict'
angular.module('prescritor')
    .controller('mainController', function ($scope, $rootScope, $location) {

        $scope.login = () =>{
            $location.path('/adm/home')
        }

        $scope.logout = () =>{
            $location.path('/login')
        }
    })