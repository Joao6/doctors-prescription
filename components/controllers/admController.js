'use strict'
angular.module('prescritor')
    .controller('admController', function ($scope, $rootScope, $location, apiService, toast, prescritor, medicament, medicamentList, prescritorList) {        
        

        if(prescritor){
            $scope.prescritor = prescritor.data
        }else{
            $scope.prescritor = {}
        }

        if(medicamentList){
            $scope.medicamentList = medicamentList.data
        }else{
            $scope.medicamentList = []
        }
        
        if(medicament){
            $scope.medicament = medicament.data
        }else{
            $scope.medicament = {}
            $scope.medicament.interationList = []
        }

        if(prescritorList){
            $scope.prescritorList = prescritorList.data
        }else{
            $scope.prescritorList = []
        }

        $scope.apresentationList = ['Comprimido','Gotas','Solução']
        $scope.accountList = ['Free', 'Premium']


        $scope.savePrescritor = (prescritor) => {
            apiService.createPrescritor(prescritor).success( data => {
                toast.success('Prescritor cadastrado com sucesso!', 3000)
                $location.path('/adm/prescritores')
            }).error( err => {
                toast.error('Erro ao cadastrar o prescritor!', 3000)
            })
        }

        $scope.updatePrescritor = (prescritor) => {
            apiService.updatePrescritor(prescritor).success( data => {
                toast.success('Prescritor editado com sucesso!', 3000)
                $location.path('/adm/prescritores')
            }).error( err => {
                toast.error('Erro ao editar o prescritor!', 3000)
            })
        }

        $scope.deletePrescritor = (id) => {
            apiService.deletePrescritor(id).success( data => {
                $scope.getPrescritorList()
                toast.success('Prescritor excluido com sucesso!', 3000)
            }).error( err => {
                toast.error('Erro ao excluir o prescritor!', 3000)
            })
        }

        $scope.getPrescritorList = (name) =>{
            if(name === ""){
                name = null
            }
            apiService.getPrescritors(name).success( data => {
                $scope.prescritorList = data
            }).error( err =>{
                toast.error('Erro ao buscar a lista de prescritores!', 3000)
            })
        }

        $scope.saveMedicament = (medicament) => {
            apiService.createMedicament(medicament).success( data => {
                toast.success('Medicamento cadastrado com sucesso!', 3000)
                $location.path('/adm/medicamentos')
            }).error( err => {
                toast.error('Erro ao cadastrar o medicamento!', 3000)
            })
        }

        $scope.updateMedicament = (medicament) => {
            apiService.updateMedicament(medicament).success( data => {
                toast.success('Medicamento editado com sucesso!', 3000)
                $location.path('/adm/prescritores')
            }).error( err => {
                toast.error('Erro ao editar o medicamento!', 3000)
            })
        }

        $scope.deleteMedicament = (id) => {
            apiService.deleteMedicament(id).success( data => {
                $scope.getMedicamentList()
                toast.success('Medicamento excluido com sucesso!', 3000)
            }).error( err => {
                toast.error('Erro ao excluir o medicamento!', 3000)
            })
        }

        $scope.getMedicamentList = (name) =>{
            if(name === ""){
                name = null
            }
            apiService.getMedicaments(name).success( data => {
                $scope.medicamentList = data
            }).error( err =>{
                toast.error('Erro ao buscar a lista de medicamentos!', 3000)
            })
        }

        $scope.addInteracao = (medicament) => {
            const interation = {
                medicament: {},
                description: ""
            }
            medicament.interationList.push(interation)
        }

        $scope.openModal = (modal, id) => {            
            $scope.idDelete = id            
            $('#' + modal).modal()
        }

        $scope.logout = () =>{
            $location.path('/login')
        }

    })