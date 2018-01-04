'use strict'
angular.module('prescritor')
    .controller('prescritorController', function ($scope, $rootScope, $location, apiService, AuthService, userService, printService, toast, pacientList, prescriptionList, prescriptionInfo, pacientInfo, profile) {

        $rootScope.loading = false

        if (pacientInfo) {
            $scope.pacient = pacientInfo.data
        } else {
            $scope.pacient = {}
        }

        if (prescriptionList) {
            $rootScope.loading = true
            apiService.getPrescriptions($rootScope.currentUser.id).then(data => {
                $scope.prescriptionList = data.data.content
                $rootScope.loading = false
            })
        } else {
            $scope.prescriptionList = []
        }

        if (prescriptionInfo) {
            $scope.prescription = prescriptionInfo.data
        } else {
            $scope.prescription = {}
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

        if (profile) {
            $rootScope.loading = true
            apiService.getUserById($rootScope.currentUser.id).then(data => {
                $scope.prescritor = data.data
                $rootScope.loading = false
            })
        }

        $scope.medicamentList = []
        $scope.interationList = []
        //$scope.prescription = {}

        $scope.savePacient = (pacient) => {
            //pacient.prescritor = $rootScope.userLogged            
            apiService.createPacient(pacient).then(data => {
                toast.success('Paciente cadastrado com sucesso!', 3000)
                $location.path('/prescritor/pacientes')
            }).catch(function (error) {
                toast.error('Erro ao cadastrar o paciente!', 3000)
            })
        }

        $scope.updatePacient = (pacient) => {
            apiService.updatePacient(pacient).then(data => {
                toast.success('Paciente editado com sucesso!', 3000)
                $location.path('/prescritor/pacientes')
            }).catch(function (error) {
                toast.error('Erro ao editar o paciente!', 3000)
            })
        }

        $scope.deletePacient = (id) => {
            apiService.deletePacient(id).then(data => {
                $scope.getPacientList()
                toast.then('Paciente excluido com sucesso!', 3000)
            }).catch(function (error) {
                toast.error('Erro ao excluir o paciente!', 3000)
            })
        }

        $scope.deletePrescription = (id) => {
            apiService.deletePrescription(id).then(data => {
                $scope.getPrescriptionList()
                toast.then('Prescrição excluída com sucesso!', 3000)
            }).catch(function (error) {
                toast.error('Erro ao excluir o paciente!', 3000)
            })
        }

        $scope.getPacientList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getPacientList(name).then(data => {
                $scope.pacientList = data.data
            }).catch(function (error) {
                toast.error('Erro ao buscar a lista de pacientes!', 3000)
            })
        }

        $scope.getMedicamentList = (name) => {
            apiService.getMedicaments(name).then(data => {
                $scope.medicamentList = data
            }).catch(function (error) {
                toast.error('Erro ao buscar a lista de medicamentos!', 3000)
            })
        }

        $scope.getPrescriptionList = (name) => {
            apiService.getPrescriptions(name).then(data => {
                $scope.prescriptionList = data.data.content
            }).catch(function (error) {
                toast.error('Erro ao buscar a lista de prescrições!', 3000)
            })
        }

        $scope.printPrescription = (prescription, type) => {
            if (type == 'onePage') {
                apiService.getPrescriptionById(prescription.id).then(data => {
                    printService.onePage(data.data)
                })
            } else if (type == 'onePerPage') {
                apiService.getPrescriptionById(prescription.id).then(data => {
                    printService.onePerPage(data.data)
                })
            }
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

        $scope.openModalPrint = (modal, prescriptionPrint) => {
            $scope.prescriptionPrint = prescriptionPrint
            $('#' + modal).modal()
        }

        $scope.logout = () => {
            AuthService.logout()
            $location.path('login')
        }

        function addMask() {
            $('.phone_with_ddd').mask('(00) 00000-0000');
            $('.date').mask('00/00/0000');
            $('.uf').mask('AA');
        }

        addMask()

    })