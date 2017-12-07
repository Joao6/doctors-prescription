angular.module('prescritor').service('userService', function ($rootScope, $location, toast, apiService) {

    this.validateLogin = (user) => {
        if (user.email === 'adm@gmail.com' && user.password === '123') {
            $location.path('/adm/home')
            $rootScope.userLogged = { name: 'Admin', email: 'adm@gmail.com' }
            window.localStorage.setItem('qrcode-user-hash', JSON.stringify($rootScope.userLogged))
        } else {
            apiService.getPrescritors().then(data => {
                if (data.data) {
                    data.data.forEach(function (element) {
                        if (element.email === user.email && element.password === user.password) {
                            $rootScope.userLogged = element
                        }
                    })
                    if (!$rootScope.userLogged) {
                        toast.error('Dados incorretos!', 3000)
                    } else {
                        window.localStorage.setItem('qrcode-user-hash', JSON.stringify($rootScope.userLogged))
                        $location.path('/prescritor/home')
                    }
                }
            })
        }
    }

    this.logout = () => {
        $rootScope.userLogged = null
        window.localStorage.removeItem('qrcode-user-hash')
        $location.path('/login')
    }

    this.validateInstitute = (institute) => {
        let instituteOk = true
        if (institute) {
            if (!institute.nome || institute.nome === null || institute.nome === '') {
                instituteOk = false
            }
            if (!institute.email || institute.email === null || institute.email === '') {
                instituteOk = false
            }
            if (institute.localizacao) {
                if (institute.localizacao.latitude === null || institute.localizacao.latitude === '') {
                    instituteOk = false
                }
                if (institute.localizacao.longitude === null || institute.localizacao.longitude === '') {
                    instituteOk = false
                }
            } else {
                instituteOk = false
            }
            if (!institute.registroLegal || institute.registroLegal === null || institute.registroLegal === '') {
                instituteOk = false
            }
        } else {
            instituteOk = false
        }
        return instituteOk
    }

    this.validateStudent = (student) => {
        let studentOk = true
        if (student) {
            if (!student.nome || student.nome === null || student.nome === '') {
                studentOk = false
            }
            if (!student.email || student.email === null || student.email === '') {
                studentOk = false
            }
        } else {
            studentOk = false
        }
        return studentOk
    }

    this.validateElderly = (elderly) => {
        let elderlyOk = true
        if (elderly) {
            if (!elderly.nome || elderly.nome === null || elderly.nome === '') {
                $('#input-name').addClass('has-error')
                elderlyOk = false
            }
            if (elderly.senha) {
                if (elderly.senha !== $('#elderly-password-2').val()) {
                    elderlyOk = false
                    $('#input-password').addClass('has-error')
                    $('#input-password-2').addClass('has-error')
                }
            } else {
                elderlyOk = false
                $('#input-password').addClass('has-error')
                $('#input-password-2').addClass('has-error')
            }
            if (!elderly.codigo || elderly.codigo === null || elderly.codigo === '') {
                $('#input-code').addClass('has-error')
                elderlyOk = false
            }
        } else {
            elderlyOk = false
        }
        return elderlyOk
    }
})