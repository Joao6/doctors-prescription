'use strict'
angular.module('prescritor')
    .controller('prescritorController', function ($scope, $rootScope, $location, apiService, toast, pacientList, prescriptionList, prescriptionInfo, pacientInfo) {

        if(pacientInfo){
            $scope.pacient = pacientInfo.data
        }else{
            $scope.pacient = {}
        }
        
        if(prescriptionList){
            $scope.prescriptionList = prescriptionList.data
        }else{
            $scope.prescriptionList = []
        }

        if(prescriptionInfo){
            $scope.prescription = prescriptionInfo.data
        }else{
            $scope.prescription = {}
        }

        if (pacientList) {
            $scope.pacientList = pacientList.data
        } else {
            $scope.pacientList = []
        }

        $scope.medicamentList = []
        $scope.interationList = []

        $scope.test = 'Joao'

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
                $location.path('/prescritor/pacientes')
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

        $scope.getMedicamentList = (name) => {
            apiService.getMedicaments(name).success(data => {
                $scope.medicamentList = data
            }).error(err => {
                toast.error('Erro ao buscar a lista de medicamentos!', 3000)
            })
        }

        $scope.verifyInteration = (medicament, prescription) => {
            //if($scope.userLogged.acoount === 'PREMIUM')
            if (prescription.medicamentList) {
                prescription.medicamentList.forEach(function (element) {
                    if (element.interationList) {
                        element.interationList.forEach(function (interation) {
                            if (interation.medicament === medicament.id) {
                                toast.warning('Interação de medicamentos!', 3000)
                                $scope.interationList.push(interation)
                            }
                        })
                    }
                })
            } else {
                prescription.medicamentList = []
            }
            prescription.medicamentList.push(medicament)
        }

        $scope.removeMedicament = (idMedicament, prescription) => {
            let index, i = 0
            prescription.medicamentList.forEach(function (element) {
                i++
                if (element.id === idMedicament) {
                    index = i
                }
            })
            prescription.medicamentList.splice(index - 1, 1)
        }

        $scope.savePrescription = (prescription) =>{
            prescription.interationList = $scope.interationList
            apiService.createPrescription(prescription).success( data => {

            }).error( err => {
                toast.error('Erro ao salvar esta prescrição!', 3000)
            })
        }

        $scope.isEmptyMedicamentList = () => {
            return $scope.medicamentList.length < 1             
        }

        $scope.isEmptyInterationList = () => {
            return $scope.interationList.length < 1              
        }

        $scope.openModal = (modal, id) => {
            $scope.idDelete = id
            $('#' + modal).modal()
        }

        $scope.logout = () =>{
            $location.path('/login')
        }

    })