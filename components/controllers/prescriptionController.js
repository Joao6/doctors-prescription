'use strict'
angular.module('prescritor')
    .controller('prescriptionController', function ($scope, $rootScope, AuthService, $location, apiService, userService, medicamentList, pacientList, useTypeList, unityList, toast, prescriptionInfo, posologias) {
        $scope.stringSettings = { template: '{{option}}', smartButtonTextConverter(skip, option) { return option; }, };
        $rootScope.loading = false
        $scope.prescription = {}
        let date = new Date()
        $scope.prescription.date = date.toLocaleDateString('pt-br')
        $scope.prescription.prescriptions = [
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
            $rootScope.loading = true
            apiService.getPacientList('', $rootScope.currentUser.id).then(data => {
                $scope.pacientList = data.data.content
                $rootScope.loading = false
            })
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
            $rootScope.loading = true
            apiService.getPosologiaList('', $rootScope.currentUser.id).then(data => {
                $scope.posologiaList = data.data.content
                $rootScope.loading = false
            })
        }

        if (prescriptionInfo) {
            $scope.prescription = prescriptionInfo.data
        }

        $scope.verifyInteration = (medicament, prescription) => {
            //if($scope.userLogged.account === 'PREMIUM')
            if (prescription.prescriptions) {
                prescription.prescriptions.forEach(function (element) {
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
            if (prescription.id) {
                //update
                apiService.updatePrescription(prescription).then(data => {
                    toast.success('Prescrição atualizada com sucesso!', 3000)
                    $location.path('prescritor/prescricao')
                }).catch(function (error) {
                    toast.error('Erro ao salvar esta prescrição!', 3000)
                })
            } else {
                //create
                //prescription.interationList = $scope.interationList
                prescription.description = ''
                apiService.createPrescription(prescription).then(data => {
                    toast.success('Prescrição cadastrada com sucesso!', 3000)
                    $location.path('prescritor/prescricao')
                }).catch(function (error) {
                    toast.error('Erro ao salvar esta prescrição!', 3000)
                })
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

        $scope.openPosologia = (prescript, modal) => {
            $scope.getPosologiaList()
            if (prescript) {
                $rootScope.prescript = prescript
            } else {
                $rootScope.prescript = {}
            }
            $("#modal-" + modal).modal()
        }

        $scope.getPosologiaList = () => {
            apiService.getPosologiaList('', $rootScope.currentUser.id).then(data => {
                $scope.posologiaList = data.data.content
                $rootScope.loading = false
            })
        }

        $scope.addPosologia = (posologia) => {
            if (posologia) {
                $rootScope.prescript.description = posologia
            }
        }

        $scope.savePosologia = (posologia) => {
            let poso = { description: posologia, doctor: $rootScope.currentUser }
            apiService.createPosologia(poso).then(data => {
                toast.success('Salvo com sucesso!', 3000)
            })
        }

        $scope.logout = () => {
            AuthService.logout()
            $location.path('login')
        }
    })