angular.module('prescritor').run(($location, $rootScope, toast, $window, $transitions) => {

    const nonBlockedRoutes = ['/login']

    $transitions.onStart({}, function (trans) {

        const urlActual = $location.path();
        if ($rootScope.userLogged != null) {
            if ($rootScope.userLogged.type === 'adm') {
                if ((urlActual.indexOf('/prescritor/') !== -1)) {
                    //$location.path('/access-denied')
                    toast.error('Você não possui permissão', 4000)
                }
            } else if ($rootScope.userLogged.type === 'prescritor') {
                if ((urlActual.indexOf('/adm/') !== -1)) {
                    //$location.path('/access-denied')
                    toast.error('Você não possui permissão', 4000)
                }
            }
        } else {
            if (nonBlockedRoutes.indexOf(urlActual) === -1) {
                if (!window.localStorage.getItem('qrcode-user-hash')) {
                    toast.warning('Sua sessão expirou, faça login novamente!', 4000)
                    $location.path('/login')                    
                    $window.location.href = '/#!/login';
                } else {
                    let user = window.localStorage.getItem('qrcode-user-hash')
                    $rootScope.userLogged = JSON.parse(user)
                }
            }
        }
    })
})
