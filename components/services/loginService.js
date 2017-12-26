angular.module('prescritor')
    .factory('loginFactory', ['$http', '$q',
        function ($http, $q) {
            var loginFactory = {}
            $http.defaults.useXDomain = true

            loginFactory.login = function (user) {
                var deferred = $q.defer()

                $http({
                    method: 'POST',
                    url: 'http://localhost:8080/login',
                    data: {
                        email: user.email,
                        password: user.pword
                    }
                }).success(function (res) {
                    deferred.resolve(res)
                }).error(function (err) {
                    deferred.reject(err)
                })

                return deferred.promise
            }

            return loginFactory
        }
    ])