angular.module('prescritor').run(function ($rootScope, $state, $http, AUTH_EVENTS, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
        if (next.name !== 'login') {
            var authorizedRoles = next.data.authorizedRoles
            if (authorizedRoles.indexOf('*') != 0)
                if (!AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault()

                    if (AuthService.isAuthenticated())
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized)
                    else
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated)

                    $state.go('login')
                    alert('Access Denied')
                }
        } else if (next.name == 'responsible' && AuthService.isResponsible())
            $state.go('responsible')
    })
})