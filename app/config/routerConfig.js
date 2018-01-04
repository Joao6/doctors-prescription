angular
    .module('prescritor')
    .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {

        $stateProvider
            .state({
                name: 'login',
                url: '/login',
                templateUrl: 'views/main/login.html',
                controller: 'mainController',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .state({
                name: 'adm-home',
                url: '/adm/home',
                templateUrl: 'views/adm/home.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function () { },
                    medicament: function () { },
                    medicamentList: function () { },
                    useTypeList: function () { },
                    unityList: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-profile',
                url: '/adm/meus-dados',
                templateUrl: 'views/adm/profile.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function () { },
                    medicament: function () { },
                    medicamentList: function () { },
                    useTypeList: function () { },
                    unityList: function () { },
                    profile: function () {
                        return true
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-prescritores',
                url: '/adm/prescritores',
                templateUrl: 'views/adm/prescritor.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function (apiService) {
                        return apiService.getPrescritors()
                    },
                    prescritor: function () { },
                    medicament: function () { },
                    medicamentList: function () { },
                    useTypeList: function () { },
                    unityList: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-prescritores-new',
                url: '/adm/prescritores/novo',
                templateUrl: 'views/adm/prescritor-new.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function () { },
                    medicament: function () { },
                    medicamentList: function () { },
                    useTypeList: function () { },
                    unityList: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-prescritores-edit',
                url: '/adm/prescritores/:idPrescritor/edit',
                templateUrl: 'views/adm/prescritor-edit.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function ($stateParams, apiService) {
                        return apiService.getUserById($stateParams.idPrescritor)
                    },
                    medicament: function () { },
                    medicamentList: function () { },
                    useTypeList: function () { },
                    unityList: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-medicamentos',
                url: '/adm/medicamentos',
                templateUrl: 'views/adm/medicament.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function () { },
                    medicament: function () { },
                    medicamentList: function (apiService) {
                        return apiService.getMedicaments()
                    },
                    useTypeList: function () { },
                    unityList: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-medicaments-new',
                url: '/adm/medicamentos/novo',
                templateUrl: 'views/adm/medicament-new.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function () { },
                    medicament: function () { },
                    medicamentList: function (apiService) {
                        return apiService.getMedicaments()
                    },
                    useTypeList: function () { },
                    unityList: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-medicament-edit',
                url: '/adm/medicamentos/:idMedicament/edit',
                templateUrl: 'views/adm/medicament-edit.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function () { },
                    medicament: function ($stateParams, apiService) {
                        return apiService.getMedicamentById($stateParams.idMedicament)
                    },
                    medicamentList: function (apiService) {
                        return apiService.getMedicaments()
                    },
                    useTypeList: function () { },
                    unityList: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-unities',
                url: '/adm/unidades',
                templateUrl: 'views/adm/unities.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function () { },
                    medicament: function () { },
                    medicamentList: function () { },
                    useTypeList: function () { },
                    unityList: function (apiService) {
                        return apiService.getUnityList()
                    },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'adm-use-type',
                url: '/adm/tipo-de-uso',
                templateUrl: 'views/adm/useTypes.html',
                controller: 'admController',
                resolve: {
                    prescritorList: function () { },
                    prescritor: function () { },
                    medicament: function () { },
                    medicamentList: function () { },
                    useTypeList: function (apiService) {
                        return apiService.getUseTypeList()
                    },
                    unityList: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.manager]
                }
            })
            .state({
                name: 'prescritor-home',
                url: '/prescritor/home',
                templateUrl: 'views/prescritor/home.html',
                controller: 'prescritorController',
                resolve: {
                    pacientList: function () { },
                    prescriptionList: function () { },
                    prescriptionInfo: function () { },
                    pacientInfo: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.prescritor]
                }
            })
            .state({
                name: 'prescritor-profile',
                url: '/prescritor/meus-dados',
                templateUrl: 'views/prescritor/profile.html',
                controller: 'prescritorController',
                resolve: {
                    pacientList: function () { },
                    prescriptionList: function () { },
                    prescriptionInfo: function () { },
                    pacientInfo: function () { },
                    profile: function () {
                        return true
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.prescritor]
                }
            })
            .state({
                name: 'prescritor-prescription',
                url: '/prescritor/prescricao',
                templateUrl: 'views/prescritor/prescriptions.html',
                controller: 'prescritorController',
                resolve: {
                    pacientList: function () { },
                    prescriptionList: function (apiService) {
                        return true
                    },
                    prescriptionInfo: function () { },
                    pacientInfo: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.prescritor]
                }
            })
            .state({
                name: 'prescritor-prescription-new',
                url: '/prescritor/prescricao/novo',
                templateUrl: 'views/prescritor/prescription-new.html',
                controller: 'prescriptionController',
                resolve: {
                    pacientList: function (apiService) {
                        return apiService.getPacientList()
                    },
                    medicamentList: function (apiService) {
                        return apiService.getMedicaments()
                    },
                    useTypeList: function (apiService) {
                        return apiService.getUseTypeList()
                    },
                    unityList: function (apiService) {
                        return apiService.getUnityList()
                    },
                    prescriptionInfo: function () { },
                    posologias: function (apiService) {
                        //return apiService.getPosologiaList()
                        return true
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.prescritor]
                }
            })
            .state({
                name: 'prescritor-prescription-info',
                url: '/prescritor/prescricao/:idPrescription/info',
                templateUrl: 'views/prescritor/prescription-info.html',
                controller: 'prescriptionController',
                resolve: {
                    prescriptionInfo: function (apiService, $stateParams) {
                        return apiService.getPrescriptionById($stateParams.idPrescription)
                    },
                    pacientList: function (apiService) {
                        return apiService.getPacientList()
                    },
                    medicamentList: function (apiService) {
                        return apiService.getMedicaments()
                    },
                    useTypeList: function (apiService) {
                        return apiService.getUseTypeList()
                    },
                    unityList: function (apiService) {
                        return apiService.getUnityList()
                    },
                    posologias: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.prescritor]
                }
            })
            .state({
                name: 'prescritor-pacients',
                url: '/prescritor/pacientes',
                templateUrl: 'views/prescritor/pacients.html',
                controller: 'prescritorController',
                resolve: {
                    pacientList: function (apiService) {
                        return true
                    },
                    prescriptionList: function () { },
                    prescriptionInfo: function () { },
                    pacientInfo: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.prescritor]
                }
            })
            .state({
                name: 'prescritor-pacients-new',
                url: '/prescritor/pacientes/novo',
                templateUrl: 'views/prescritor/pacients-new.html',
                controller: 'prescritorController',
                resolve: {
                    pacientList: function () { },
                    prescriptionList: function () { },
                    prescriptionInfo: function () { },
                    pacientInfo: function () { },
                    profile: function () { }
                },
                data: {
                    authorizedRoles: [USER_ROLES.prescritor]
                }
            })
            .state({
                name: 'prescritor-pacients-edit',
                url: '/prescritor/pacientes/:idPacient/edit',
                templateUrl: 'views/prescritor/pacients-edit.html',
                controller: 'prescritorController',
                resolve: {
                    pacientList: function () { },
                    prescriptionList: function () { },
                    prescriptionInfo: function () { },
                    pacientInfo: function (apiService, $stateParams) {
                        return apiService.getPacientById($stateParams.idPacient)
                    },
                    profile: function () { }
                }
            })
            .state({
                name: 'pacient-prescription-info',
                url: '/paciente/prescricao/:idPrescription',
                templateUrl: 'views/pacient/prescription.html',
                controller: 'pacientController',
                resolve: {
                    prescriptionInfo: function (apiService, $stateParams) {
                        return apiService.getPrescriptionById($stateParams.idPrescription)
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
        $urlRouterProvider.otherwise('login')

    })