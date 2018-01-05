angular.module('prescritor')
    .factory('loginFactory', ['$http', '$q', 'config',
        function ($http, $q, config) {
            var loginFactory = {}
            $http.defaults.useXDomain = true

            loginFactory.login = function (user) {
                var deferred = $q.defer()

                $http({
                    method: 'POST',
                    url: config.baseUrl + '/login',
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