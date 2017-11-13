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
        //$scope.prescription = {}

        $scope.savePacient = (pacient) => {
            //pacient.prescritor = $rootScope.userLogged            
            apiService.createPacient(pacient).then(data => {
                toast.success('Paciente cadastrado com sucesso!', 3000)
                $location.path('/prescritor/pacientes')
            }),function error(err) {
                toast.error('Erro ao cadastrar o paciente!', 3000)
            }
        }

        $scope.updatePacient = (pacient) => {
            apiService.updatePacient(pacient).then(data => {
                toast.success('Paciente editado com sucesso!', 3000)
                $location.path('/prescritor/pacientes')
            }),function error(err){
                toast.error('Erro ao editar o paciente!', 3000)
            }
        }

        $scope.deletePacient = (id) => {
            apiService.deletePacient(id).then(data => {
                $scope.getPacientList()
                toast.then('Paciente excluido com sucesso!', 3000)
            }),function error(err) {
                toast.error('Erro ao excluir o paciente!', 3000)
            }
        }

        $scope.deletePrescription = (id) => {
            apiService.deletePrescription(id).then(data => {
                $scope.getPrescriptionList()
                toast.then('Prescrição excluída com sucesso!', 3000)
            }),function error(err) {
                toast.error('Erro ao excluir o paciente!', 3000)
            }
        }

        $scope.getPacientList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getPacientList(name).then(data => {
                $scope.pacientList = data
            }), function error(err) {
                toast.error('Erro ao buscar a lista de pacientes!', 3000)
            }
        }

        $scope.getMedicamentList = (name) => {
            apiService.getMedicaments(name).then(data => {
                $scope.medicamentList = data
            }), function error(err) {
                toast.error('Erro ao buscar a lista de medicamentos!', 3000)
            }
        }

        $scope.getPrescriptionList = (name) => {
            apiService.getPrescriptions(name).then(data => {
                $scope.prescriptionList = data.data
            }), function error(err) {
                toast.error('Erro ao buscar a lista de prescrições!', 3000)
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

        $scope.logout = () =>{
            $location.path('/login')
        }        

        function addMask(){
            $('.phone_with_ddd').mask('(00) 00000-0000');
            $('.date').mask('00/00/0000');
            $('.uf').mask('AA');
        }

        addMask()

    })