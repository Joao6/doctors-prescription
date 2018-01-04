'use strict'
angular.module('prescritor')
    .controller('mainController', function ($scope, $rootScope, $location, toast, userService, loginFactory, USER_ROLES, AuthService) {

        $scope.user = {}
        $rootScope.loading = false

        $scope.login = function (user) {
            $rootScope.loading = true
            loginFactory.login($scope.user)
                .then(function (res) {
                    $scope.setUser(res)
                    $rootScope.loading = false
                }).catch(function (error) {
                    $rootScope.loading = false
                    toast.error("Usuário ou senha inválidos!")
                })
        }

        //$scope.currentUser = null
        $scope.isAuthorized = AuthService.isAuthorized

        $scope.setUser = function (user) {
            var redirect = null

            if (user.role === 1) {
                user.roleCode = USER_ROLES.manager
                redirect = 'adm/home'
            } else if (user.role === 2) {
                user.roleCode = USER_ROLES.prescritor
                redirect = 'prescritor/home'
            }

            if (redirect !== null) {
                redirect = '/' + redirect

                $scope.currentUser = user
                $rootScope.currentUser = user

                AuthService.newSession(user)
                $location.path(redirect)

            } else
                alert('Unable to Log You In :(')
        }

        $scope.logout = () => {
            AuthService.logout()
            $location.path('login')
        }
    })