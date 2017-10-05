'use strict'
angular.module('prescritor')
    .controller('admController', function ($scope, $rootScope, $location, apiService, toast, prescritor, medicament, medicamentList, prescritorList) {


        if (prescritor) {
            $scope.prescritor = prescritor.data
        } else {
            $scope.prescritor = {}
        }

        if (medicamentList) {
            $scope.medicamentList = medicamentList.data
        } else {
            $scope.medicamentList = []
        }

        if (medicament) {
            $scope.medicament = medicament.data
        } else {
            $scope.medicament = {}
            $scope.medicament.interationList = []
            $scope.medicament.apresentationList = $scope.apresentationList
            $scope.medicament.commercialNameList = $scope.commercialNameList
            $scope.medicament.dosageList = $scope.dosageList
        }

        if (prescritorList) {
            $scope.prescritorList = prescritorList.data
        } else {
            $scope.prescritorList = []
        }

        $scope.apresentationList = ['Comprimido', 'Gotas', 'Solução']
        $scope.accountList = ['Free', 'Premium']

        $scope.apresentationList = [{ description: '' }]
        $scope.commercialNameList = [{ name: '' }]
        $scope.dosageList = [{ description: '' }]

        $scope.savePrescritor = (prescritor) => {
            apiService.createPrescritor(prescritor).success(data => {
                toast.success('Prescritor cadastrado com sucesso!', 3000)
                $location.path('/adm/prescritores')
            }).error(err => {
                toast.error('Erro ao cadastrar o prescritor!', 3000)
            })
        }

        $scope.updatePrescritor = (prescritor) => {
            apiService.updatePrescritor(prescritor).success(data => {
                toast.success('Prescritor editado com sucesso!', 3000)
                $location.path('/adm/prescritores')
            }).error(err => {
                toast.error('Erro ao editar o prescritor!', 3000)
            })
        }

        $scope.deletePrescritor = (id) => {
            apiService.deletePrescritor(id).success(data => {
                $scope.getPrescritorList()
                toast.success('Prescritor excluido com sucesso!', 3000)
            }).error(err => {
                toast.error('Erro ao excluir o prescritor!', 3000)
            })
        }

        $scope.getPrescritorList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getPrescritors(name).success(data => {
                $scope.prescritorList = data
            }).error(err => {
                toast.error('Erro ao buscar a lista de prescritores!', 3000)
            })
        }

        $scope.saveMedicament = (medicament) => {
            apiService.createMedicament(medicament).success(data => {
                toast.success('Medicamento cadastrado com sucesso!', 3000)
                $location.path('/adm/medicamentos')
            }).error(err => {
                toast.error('Erro ao cadastrar o medicamento!', 3000)
            })
        }

        $scope.updateMedicament = (medicament) => {
            apiService.updateMedicament(medicament).success(data => {
                toast.success('Medicamento editado com sucesso!', 3000)
                $location.path('/adm/medicamentos')
            }).error(err => {
                toast.error('Erro ao editar o medicamento!', 3000)
            })
        }

        $scope.deleteMedicament = (id) => {
            apiService.deleteMedicament(id).success(data => {
                $scope.getMedicamentList()
                toast.success('Medicamento excluido com sucesso!', 3000)
            }).error(err => {
                toast.error('Erro ao excluir o medicamento!', 3000)
            })
        }

        $scope.getMedicamentList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getMedicaments(name).success(data => {
                $scope.medicamentList = data
            }).error(err => {
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

        $scope.addInput = (medicament, list) => {
            const obj = {}
            if (list === 'apresentation') {
                medicament.apresentationList.push(obj)
            } else if (list === 'commercialName') {
                medicament.commercialNameList.push(obj)
            } else if (list === 'dosage') {
                medicament.dosageList.push(obj)
            }
        }

        $scope.removeInput = (medicament, input, list) => {
            let index = 0;
            if (list === 'apresentation') {
                index = medicament.apresentationList.indexOf(input)
                medicament.apresentationList.splice(index, 1)
            } else if (list === 'commercialName') {
                index = medicament.commercialNameList.indexOf(input)
                medicament.commercialNameList.splice(index, 1)
            } else if (list === 'dosage') {
                index = medicament.dosageList.indexOf(input)
                medicament.dosageList.splice(index, 1)
            }
        }

        $scope.openModal = (modal, id) => {
            $scope.idDelete = id
            $('#' + modal).modal()
        }

        $scope.logout = () => {
            $location.path('/login')
        }

        function addMask() {
            $('.phone_with_ddd').mask('(00) 00000-0000', { placeholder: "Ex.: (99) 99999-9999" });
            $('.cpf').mask('000.000.000-00', { reverse: false, placeholder: "Ex.: 000.000.000-00" });
            $('.number').mask('0000', { placeholder: "Ex.: 0000" });
            $('.typeNumber').mask('SSS', {
                translation: {
                    'S': { pattern: /[A-Za-z]/ }
                }
            });
        }

        addMask()


    })