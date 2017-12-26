'use strict'
angular.module('prescritor')
    .controller('prescriptionController', function ($scope, $rootScope, $location, apiService, userService, medicamentList, pacientList, useTypeList, unityList, toast, prescriptionInfo, posologias) {
        $scope.stringSettings = { template: '{{option}}', smartButtonTextConverter(skip, option) { return option; }, };
        $scope.prescription = {}
        $scope.prescription.date = new Date().getTime()
        $scope.prescription.precriptions = [
            {
                comercialName: [],
                useType: {},
                medicament: {}
            }
        ]

        if (medicamentList) {
            $scope.medicamentList = medicamentList.data.content
        } else {
            $scope.medicamentList = []
        }

        if (pacientList) {
            $scope.pacientList = pacientList.data.content
        } else {
            $scope.pacientList = []
        }

        if (useTypeList) {
            $scope.useTypeList = useTypeList.data.content
        } else {
            $scope.useTypeList = []
        }

        if (unityList) {
            $scope.unityList = unityList.data.content
        } else {
            $scope.unityList = []
        }

        if (posologias) {
            $scope.posologiaList = posologias.data
        }

        if (prescriptionInfo) {
            $scope.prescription = prescriptionInfo.data
        }

        $scope.verifyInteration = (medicament, prescription) => {
            //if($scope.userLogged.account === 'PREMIUM')
            if (prescription.precriptions) {
                prescription.precriptions.forEach(function (element) {
                    if (element.medicament) {
                        element.medicament.interationList.forEach(function (interation) {
                            if (interation.medicament === medicament.id) {
                                toast.warning('Interação de medicamentos!', 3000)
                                //$scope.interationList.push(interation)
                            }
                        })
                    }
                })
            }
            //prescription.medicamentList.push(medicament)
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
            delete prescription.pacient.doctor.roles            
            if(prescription.id){
                //update
                apiService.updatePrescription(prescription).then(data => {
                    toast.success('Prescrição atualizada com sucesso!', 3000)
                    $location.path('prescritor/prescricao')
                }), function error(err) {
                    toast.error('Erro ao salvar esta prescrição!', 3000)
                }
            } else {
                //create
                //prescription.interationList = $scope.interationList
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
            prescription.precriptions.push(
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

        $scope.openPosologia = (prescript, modal) => {
            if (prescript) {
                $rootScope.prescript = prescript
            } else {
                $rootScope.prescript = {}
            }
            $("#modal-" + modal).modal()
        }

        $scope.addPosologia = (posologia) => {
            if (posologia) {
                $rootScope.prescript.description = posologia
            }
        }

        $scope.savePosologia = (posologia) => {
            let poso = { description: posologia, prescritor: $rootScope.userLogged }
            apiService.createPosologia(poso).then(data => {
                toast.success('Salvo com sucesso!', 3000)
            })
        }

        $scope.logout = () => {
            userService.logout()
        }
    })