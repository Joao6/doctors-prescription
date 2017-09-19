'use strict'
angular.module('prescritor')
    .controller('prescritorController', function ($scope, $rootScope, $location, apiService, toast, pacientList) {

        if (pacientList) {
            $scope.pacientList = pacientList.data
        } else {
            $scope.pacientList = []
        }

        $scope.savePacient = (pacient) => {
            //pacient.prescritor = $rootScope.userLogged            
            apiService.createPacient(pacient).success(data => {
                toast.success('Paciente cadastrado com sucesso!', 3000)
                $location.path('/prescritor/pacientes')
            }).error(err => {
                toast.error('Erro ao cadastrar o paciente!', 3000)
            })
        }

        $scope.updatePacient = (pacient) => {
            apiService.updatePacient(pacient).success(data => {
                toast.success('Paciente editado com sucesso!', 3000)
                $location.path('/prescrior/pacientes')
            }).error(err => {
                toast.error('Erro ao editar o paciente!', 3000)
            })
        }

        $scope.deletePacient = (id) => {
            apiService.deletePacient(id).success(data => {
                $scope.getPacientList()
                toast.success('Paciente excluido com sucesso!', 3000)
            }).error(err => {
                toast.error('Erro ao excluir o paciente!', 3000)
            })
        }

        $scope.getPacientList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getPacientList(name).success(data => {
                $scope.pacientList = data
            }).error(err => {
                toast.error('Erro ao buscar a lista de pacientes!', 3000)
            })
        }

        $scope.verifyInteration = (medicament, prescription) => {
            //if($scope.userLogged.acoount === 'PREMIUM')
            prescription.medicamentList.forEach(function (element) {
                element.interationList.forEach(function(interation){
                    if(interation.medicament === medicament.id){
                        toast.warning('Interação de medicamentos!', 3000)
                    }
                })
            })
        }

        $scope.openModal = (modal, id) => {
            $scope.idDelete = id
            $('#' + modal).modal()
        }

    })