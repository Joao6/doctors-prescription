angular.module('prescritor').service('userService', function ($rootScope, $location, toast) {
    
        this.validateLogin = (user) => {
            /*userAPI.validateLogin(user.identifier, user.password).success( data => {
                if(data){
                    $rootScope.userLogged = data
                    if(data.email){
                        window.sessionStorage.setItem('ls-user-login', data.email)
                    }else{
                        window.sessionStorage.setItem('ls-user-login', data.codigo)
                    }                
                    window.sessionStorage.setItem('ls-user-password', data.senha)
                    if (data.tipo === 'adm') {
                        $location.path('/adm/home')
                    } else if (data.tipo === 'est') {
                        $location.path('/student/home')
                    } else if(data.tipo === 'ido') {
                        $location.path('/elderly/home')
                    } else {
                        $location.path('/institute/home')
                    }
                }else{
                    toast.toastError('Invalid Login or password.', 4000)
                }
            }).error( err => {
                toast.toastError('Internal server error =(', 4000)
            })*/
        }
    
        this.logout = () => {
            $rootScope.userLogged = null
            window.sessionStorage.removeItem('ls-user-login')
            window.sessionStorage.removeItem('ls-user-password')
            $location.path('/')
        }
    
        this.validateInstitute = (institute) =>{
            let instituteOk = true
            if(institute){
                if(!institute.nome || institute.nome === null || institute.nome === ''){
                    instituteOk = false
                }
                if(!institute.email || institute.email === null || institute.email === ''){
                    instituteOk = false
                }
                if(institute.localizacao){
                    if(institute.localizacao.latitude === null || institute.localizacao.latitude === ''){
                        instituteOk = false
                    }
                    if(institute.localizacao.longitude === null || institute.localizacao.longitude === ''){
                        instituteOk = false
                    }
                }else{
                    instituteOk = false
                }
                if(!institute.registroLegal || institute.registroLegal === null || institute.registroLegal === ''){
                    instituteOk = false
                }
            }else{
                instituteOk = false
            }
            return instituteOk
        }
    
        this.validateStudent = (student) =>{
            let studentOk = true
            if(student){
                if(!student.nome || student.nome === null || student.nome === ''){
                    studentOk = false
                }
                if(!student.email || student.email === null || student.email === ''){
                    studentOk = false
                }            
            }else{
                studentOk = false
            }
            return studentOk
        }
    
        this.validateElderly = (elderly) =>{
            let elderlyOk = true
            if(elderly){
                if(!elderly.nome || elderly.nome === null || elderly.nome === ''){
                    $('#input-name').addClass('has-error')
                    elderlyOk = false
                }
                if(elderly.senha){
                    if(elderly.senha !== $('#elderly-password-2').val()){
                        elderlyOk = false
                        $('#input-password').addClass('has-error')
                        $('#input-password-2').addClass('has-error')                    
                    }
                }else{
                    elderlyOk = false
                    $('#input-password').addClass('has-error')
                    $('#input-password-2').addClass('has-error')  
                }
                if(!elderly.codigo || elderly.codigo === null || elderly.codigo === ''){
                    $('#input-code').addClass('has-error')
                    elderlyOk = false
                }              
            }else{
                elderlyOk = false
            }
            return elderlyOk
        }
    })