angular.module('prescritor')
    .factory('AuthService', ['$http', 'Session',
        function ($http, Session) {
            var authService = {}

            authService.redirect = true

            authService.newSession = function (user) {
                Session.create(user.id, user.role, user.roleCode)

                return user
            }

            authService.logout = function () {
                Session.destroy()
            }

            authService.isResponsible = function () {
                return !!Session.id && (Session.roleCode === USER_ROLES.responsible || Session.roleCode === USER_ROLES.manager)
            }

            authService.isAuthenticated = function () {
                return !!Session.id
            }

            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles]
                }

                return (authService.isAuthenticated() &&
                    authorizedRoles.indexOf(Session.roleCode) !== -1)
            }

            return authService
        }
    ])