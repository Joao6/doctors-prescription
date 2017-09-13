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
            prescritor: function(){},
            medicament: function(){}
        }         
    })
    .state({
        name: 'adm-prescritores',
        url: '/adm/prescritores',
        templateUrl: 'views/adm/prescritor.html',
        controller: 'admController',  
        resolve:{
            prescritor: function(){},
            medicament: function(){}
        }  
    })
    .state({
        name: 'adm-prescritores-new',
        url: '/adm/prescritores/novo',
        templateUrl: 'views/adm/prescritor-new.html',
        controller: 'admController',  
        resolve:{
            prescritor: function(){},
            medicament: function(){}
        }        
    })
    .state({
        name: 'adm-prescritores-edit',
        url: '/adm/prescritores/:idPrescritor/edit',
        templateUrl: 'views/adm/prescritor-edit.html',
        controller: 'admController',  
        resolve:{
            prescritor: function($stateParams, apiService){
                return apiService.getUserById($stateParams.idPrescritor) 
            },
            medicament: function(){}
        }      
    })
    .state({
        name: 'adm-medicamentos',
        url: '/adm/medicamentos',
        templateUrl: 'views/adm/medicament.html',
        controller: 'admController',  
        resolve:{
            prescritor: function(){},
            medicament: function(){}
        }        
    })    
    .state({
        name: 'adm-medicaments-new',
        url: '/adm/medicamentos/novo',
        templateUrl: 'views/adm/medicament-new.html',
        controller: 'admController',  
        resolve:{
            prescritor: function(){},
            medicament: function(){}
        }        
    })
    .state({
        name: 'adm-medicament-edit',
        url: '/adm/medicamentos/:idMedicament/edit',
        templateUrl: 'views/adm/medicament-edit.html',
        controller: 'admController',  
        resolve:{
            prescritor: function(){},
            medicament: function($stateParams, apiService){
                return apiService.getMedicamentById($stateParams.idMedicament) 
            }
        }      
    })
$urlRouterProvider.otherwise('login')

}