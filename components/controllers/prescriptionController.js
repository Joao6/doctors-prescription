'use strict'
angular.module('prescritor')
    .controller('prescriptionController', function ($scope, $rootScope, $location, apiService, medicamentList, pacientList, useTypeList, unityList, toast, prescriptionInfo) {
        $scope.stringSettings = { template: '{{option}}', smartButtonTextConverter(skip, option) { return option; }, };
        $scope.prescription = {}
        $scope.prescription.date = new Date().getTime()
        $scope.prescription.prescriptions = [
            {
                comercialName: [],
                useType: {},
                medicament: {}
            }
        ]

        if (medicamentList) {
            $scope.medicamentList = medicamentList.data
        } else {
            $scope.medicamentList = []
        }

        if (pacientList) {
            $scope.pacientList = pacientList.data
        } else {
            $scope.pacientList = []
        }

        if (useTypeList) {
            $scope.useTypeList = useTypeList.data
        } else {
            $scope.useTypeList = []
        }

        if (unityList) {
            $scope.unityList = unityList.data
        } else {
            $scope.unityList = []
        }

        if (prescriptionInfo) {
            $scope.prescription = prescriptionInfo.data
            /* $('#qrcode').qrcode("http://localhost:3000/!#/prescricao-info/" + $scope.prescription.id); */
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

        $scope.removeMedicament = (medicament, list) => {
            let index, i = 0
            list.forEach(function (element) {
                i++
                if (element.id === medicament.id) {
                    index = i
                }
            })
            list.splice(index - 1, 1)
        }

        $scope.removePrescription = (prescription, list) => {
            let index = list.indexOf(prescription)
            list.splice(index, 1)
        }

        $scope.savePrescription = (prescription) => {
            if(prescription.id){
                //update
                apiService.updatePrescription(prescription).then(data => {
                    toast.success('Prescrição atualizada com sucesso!', 3000)
                    $location.path('prescritor/prescricao')
                }), function error(err){
                    toast.error('Erro ao salvar esta prescrição!', 3000)
                }
            }else{
                //create
                prescription.interationList = $scope.interationList
                apiService.createPrescription(prescription).then(data => {
                    toast.success('Prescrição cadastrada com sucesso!', 3000)
                    $location.path('prescritor/prescricao')
                }), function error(err) {
                    toast.error('Erro ao salvar esta prescrição!', 3000)
                }
            }
        }        

        $scope.isEmptyMedicamentList = () => {
            return $scope.medicamentList.length < 1
        }

        $scope.isEmptyInterationList = () => {
            return $scope.interationList.length < 1
        }

        $scope.addPrescription = (prescription) => {
            prescription.prescriptions.push(
                {
                    comercialName: [],
                    useType: {},
                    medicament: {}
                }
            )
        }

        $scope.pacientIsNull = (pacient) => {
            return pacient === undefined
        }

        $scope.addMedicament = (prescript) => {
            /* prescript.medicamentList.push(
                {
                    "useType": "",
                    "description": "",
                    "unity": {},
                    "quantity": "",
                    "apresentation": "",
                    "comercialName": [],
                    "medicament": {}
                }
            ) */
        }

        $scope.logout = () => {
            $location.path('/login')
        }
    })