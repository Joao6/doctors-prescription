'use strict'
angular.module('prescritor')
    .controller('prescriptionController', function ($scope, $rootScope, $location, apiService, medicamentList, pacientList,useTypeList, unityList) {
        $scope.prescription = {}
        $scope.prescription.date = new Date().getTime()  
        
        if(medicamentList){
            $scope.medicamentList = medicamentList.data
        }else{
            $scope.medicamentList = []
        }

        if (pacientList) {
            $scope.pacientList = pacientList.data
        } else {
            $scope.pacientList = []
        }

        if(useTypeList){
            $scope.useTypeList = useTypeList.data
        }else{
            $scope.useTypeList = []
        }

        if(unityList){
            $scope.unityList = unityList.data
        }else{
            $scope.unityList = []
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
            apiService.createPrescription(prescription).then( data => {

            }), function error( err){
                toast.error('Erro ao salvar esta prescrição!', 3000)
            }
        }

        $scope.isEmptyMedicamentList = () => {
            return $scope.medicamentList.length < 1             
        }

        $scope.isEmptyInterationList = () => {
            return $scope.interationList.length < 1              
        }

        $scope.logout = () =>{
            $location.path('/login')
        }
    })