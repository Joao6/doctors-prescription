'use strict'
angular.module('prescritor')
    .controller('admController', function ($scope, $rootScope, $location, apiService, toast, prescritor, medicament, medicamentList, prescritorList) {

        $scope.apresentationList = [{}]
        $scope.commercialNameList = [{}]

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
            let apresentationList = []
            let comercialNameList = []
            $scope.medicament.apresentationList.forEach(function (element) {
                apresentationList.push({ value: element })
            })
            $scope.medicament.commercialNameList.forEach(function (element) {
                comercialNameList.push({ value: element })
            })
            $scope.medicament.apresentationList = apresentationList
            $scope.medicament.commercialNameList = comercialNameList
        } else {
            $scope.medicament = {}
            $scope.medicament.interationList = []
            $scope.medicament.apresentationList = $scope.apresentationList
            $scope.medicament.commercialNameList = $scope.commercialNameList
        }

        if (prescritorList) {
            $scope.prescritorList = prescritorList.data
        } else {
            $scope.prescritorList = []
        }

        //$scope.apresentationList = ['Comprimido', 'Gotas', 'Solução']
        $scope.accountList = ['Free', 'Premium']


        $scope.savePrescritor = (prescritor) => {
            apiService.createPrescritor(prescritor).then(data => {
                toast.success('Prescritor cadastrado com sucesso!', 3000)
                $location.path('/adm/prescritores')
            }), function error(err) {
                toast.error('Erro ao cadastrar o prescritor!', 3000)
            }
        }

        $scope.updatePrescritor = (prescritor) => {
            apiService.updatePrescritor(prescritor).then(data => {
                toast.success('Prescritor editado com sucesso!', 3000)
                $location.path('/adm/prescritores')
            }), function error(err) {
                toast.error('Erro ao editar o prescritor!', 3000)
            }
        }

        $scope.deletePrescritor = (id) => {
            apiService.deletePrescritor(id).then(data => {
                $scope.getPrescritorList()
                toast.success('Prescritor excluido com sucesso!', 3000)
            }), function error(err) {
                toast.error('Erro ao excluir o prescritor!', 3000)
            }
        }

        $scope.getPrescritorList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getPrescritors(name).then(data => {
                $scope.prescritorList = data.data
            }), function error(err) {
                toast.error('Erro ao buscar a lista de prescritores!', 3000)
            }
        }

        $scope.saveMedicament = (medicament) => {
            let apresentationList = []
            let comercialNameList = []
            medicament.apresentationList.forEach(function (element) {
                apresentationList.push(element.value)
            });
            medicament.commercialNameList.forEach(function (element) {
                comercialNameList.push(element.value)
            });
            medicament.apresentationList = apresentationList
            medicament.commercialNameList = comercialNameList
            apiService.createMedicament(medicament).then(data => {
                toast.success('Medicamento cadastrado com sucesso!', 3000)
                $location.path('/adm/medicamentos')
            }), function error(err) {
                toast.error('Erro ao cadastrar o medicamento!', 3000)
            }
        }

        $scope.updateMedicament = (medicament) => {
            let apresentationList = []
            let comercialNameList = []
            medicament.apresentationList.forEach(function (element) {
                apresentationList.push(element.value)
            });
            medicament.commercialNameList.forEach(function (element) {
                comercialNameList.push(element.value)
            });
            medicament.apresentationList = apresentationList
            medicament.commercialNameList = comercialNameList
            apiService.updateMedicament(medicament).then(data => {
                toast.success('Medicamento editado com sucesso!', 3000)
                $location.path('/adm/medicamentos')
            }), function error(err) {
                toast.error('Erro ao editar o medicamento!', 3000)
            }
        }

        $scope.deleteMedicament = (id) => {
            apiService.deleteMedicament(id).then(data => {
                $scope.getMedicamentList()
                toast.success('Medicamento excluido com sucesso!', 3000)
            }), function error(err) {
                toast.error('Erro ao excluir o medicamento!', 3000)
            }
        }

        $scope.getMedicamentList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getMedicaments(name).then(data => {
                $scope.medicamentList = data.data
            }), function error(err) {
                toast.error('Erro ao buscar a lista de medicamentos!', 3000)
            }
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