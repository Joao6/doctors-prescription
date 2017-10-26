angular
.module('prescritor')
.config(AppConfig);

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider']

function AppConfig($stateProvider, $urlRouterProvider, $rootScope) {

$stateProvider
    .state({
        name: 'login',
        url: '/login',
        templateUrl: 'views/main/login.html',
        controller: 'mainController',        
    })
    .state({
        name: 'adm-home',
        url: '/adm/home',
        templateUrl: 'views/adm/home.html',
        controller: 'admController',  
        resolve:{
            prescritorList: function(){},
            prescritor: function(){},
            medicament: function(){},
            medicamentList: function (){}
        }         
    })
    .state({
        name: 'adm-prescritores',
        url: '/adm/prescritores',
        templateUrl: 'views/adm/prescritor.html',
        controller: 'admController',  
        resolve:{
            prescritorList: function(apiService){
                return apiService.getPrescritors()
            },
            prescritor: function(){},
            medicament: function(){},
            medicamentList: function (){}
        }  
    })
    .state({
        name: 'adm-prescritores-new',
        url: '/adm/prescritores/novo',
        templateUrl: 'views/adm/prescritor-new.html',
        controller: 'admController',  
        resolve:{
            prescritorList: function(){},
            prescritor: function(){},
            medicament: function(){},
            medicamentList: function (){}
        }        
    })
    .state({
        name: 'adm-prescritores-edit',
        url: '/adm/prescritores/:idPrescritor/edit',
        templateUrl: 'views/adm/prescritor-edit.html',
        controller: 'admController',  
        resolve:{
            prescritorList: function(){},
            prescritor: function($stateParams, apiService){
                return apiService.getUserById($stateParams.idPrescritor) 
            },
            medicament: function(){},
            medicamentList: function (){}
        }      
    })
    .state({
        name: 'adm-medicamentos',
        url: '/adm/medicamentos',
        templateUrl: 'views/adm/medicament.html',
        controller: 'admController',  
        resolve:{
            prescritorList: function(){},
            prescritor: function(){},
            medicament: function(){},
            medicamentList: function (apiService){
                return apiService.getMedicaments()
            }
        }        
    })    
    .state({
        name: 'adm-medicaments-new',
        url: '/adm/medicamentos/novo',
        templateUrl: 'views/adm/medicament-new.html',
        controller: 'admController',  
        resolve:{
            prescritorList: function(){},
            prescritor: function(){},
            medicament: function(){},
            medicamentList: function (apiService){
                return apiService.getMedicaments()
            }
        }        
    })
    .state({
        name: 'adm-medicament-edit',
        url: '/adm/medicamentos/:idMedicament/edit',
        templateUrl: 'views/adm/medicament-edit.html',
        controller: 'admController',  
        resolve:{
            prescritorList: function(){},
            prescritor: function(){},
            medicament: function($stateParams, apiService){
                return apiService.getMedicamentById($stateParams.idMedicament) 
            },
            medicamentList: function (apiService){
                return apiService.getMedicaments()
            }
        }      
    })
    .state({
        name: 'prescritor-home',
        url: '/prescritor/home',
        templateUrl: 'views/prescritor/home.html',
        controller: 'prescritorController',
        resolve: {
            pacientList: function(){},            
            prescriptionList: function() {},
            prescriptionInfo: function(){},
            pacientInfo: function(){}
        }
    })
    .state({
        name: 'prescritor-prescription',
        url: '/prescritor/prescricao',
        templateUrl: 'views/prescritor/prescriptions.html',
        controller: 'prescritorController',
        resolve: {
            pacientList: function(){},
            prescriptionList: function(apiService){
                return apiService.getPrescriptions()
            },            
            prescriptionInfo: function(){},
            pacientInfo: function(){}
        }
    })
    .state({
        name: 'prescritor-prescription-new',
        url: '/prescritor/prescricao/novo',
        templateUrl: 'views/prescritor/prescription-new.html',
        controller: 'prescriptionController',
        resolve: {
            pacientList: function(apiService){
                return apiService.getPacientList()
            },
            medicamentList: function(apiService) {
                return apiService.getMedicaments()
            },
            useTypeList: function(apiService){
                return apiService.getUseTypeList()
            },
            unityList: function(apiService){
                return apiService.getUnityList()
            }
        }
    })
    .state({
        name: 'prescritor-prescription-info',
        url: '/prescritor/prescricao/:idPrescription/info',
        templateUrl: 'views/prescritor/prescription-info.html',
        controller: 'prescritorController',
        resolve: {
            pacientList: function(apiService){
                return apiService.getPacientList()
            },            
            prescriptionList: function() {},
            prescriptionInfo: function(apiService, $stateParams){
                return apiService.getPrescriptionById($stateParams.idPrescription)
            },
            pacientInfo: function(){}
        }
    })     
    .state({
        name: 'prescritor-pacients',
        url: '/prescritor/pacientes',
        templateUrl: 'views/prescritor/pacients.html',
        controller: 'prescritorController',
        resolve: {
            pacientList: function(apiService){
                return apiService.getPacientList()
            },            
            prescriptionList: function() {},
            prescriptionInfo: function(){},
            pacientInfo: function(){}
        }
    })
    .state({
        name: 'prescritor-pacients-new',
        url: '/prescritor/pacientes/novo',
        templateUrl: 'views/prescritor/pacients-new.html',
        controller: 'prescritorController',
        resolve: {
            pacientList: function(){},            
            prescriptionList: function() {},
            prescriptionInfo: function(){},
            pacientInfo: function(){}
        }             
    })
    .state({
        name: 'prescritor-pacients-edit',
        url: '/prescritor/pacientes/:idPacient/edit',
        templateUrl: 'views/prescritor/pacients-edit.html',
        controller: 'prescritorController',
        resolve: {
            pacientList: function(){},            
            prescriptionList: function() {},
            prescriptionInfo: function(){},
            pacientInfo: function(apiService,$stateParams){
                return apiService.getPacientById($stateParams.idPacient)
            }
        }             
    })
$urlRouterProvider.otherwise('login')

}