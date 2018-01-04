'use strict'
angular.module('prescritor')
    .controller('admController', function ($scope, $rootScope, $location, apiService, AuthService, userService, toast, prescritor, medicament, medicamentList, prescritorList, useTypeList, unityList, profile) {

        $scope.apresentationList = [{}]
        $scope.commercialNameList = [{}]
        $rootScope.loading = false

        if (prescritor) {
            $scope.prescritor = prescritor.data
            let register = $scope.prescritor.crm.split(" ")
            $scope.prescritor.typeNumber = register[0]
            $scope.prescritor.number = Number(register[1])
        } else {
            $scope.prescritor = {}
        }

        if (medicamentList) {
            $scope.medicamentList = medicamentList.data.content
        } else {
            $scope.medicamentList = []
        }

        if (profile) {
            $rootScope.loading = true
            apiService.getUserById($rootScope.currentUser.id).then(data => {
                $scope.adm = data.data
                $rootScope.loading = false
            })
        }

        if (medicament) {
            $scope.medicament = medicament.data
            let apresentationList = []
            let comercialNameList = []
            $scope.medicament.apresentations.forEach(function (element) {
                apresentationList.push({ value: element })
            })
            $scope.medicament.comercialNames.forEach(function (element) {
                comercialNameList.push({ value: element })
            })
            $scope.medicament.apresentations = apresentationList
            $scope.medicament.comercialNames = comercialNameList
        } else {
            $scope.medicament = {}
            $scope.medicament.interations = []
            $scope.medicament.apresentations = $scope.apresentationList
            $scope.medicament.comercialNames = $scope.commercialNameList
        }

        if (prescritorList) {
            $scope.prescritorList = prescritorList.data.content
        } else {
            $scope.prescritorList = []
        }

        if(useTypeList){
            $scope.useTypeList = useTypeList.data.content
        }

        if(unityList){
            $scope.unityList = unityList.data.content
        }

        $scope.accountList = [{ "value": 2, "name": 'Free' }, { 'value': 1, 'name': 'Premium' }]


        $scope.savePrescritor = (prescritor) => {
            $rootScope.loading = true
            if(!prescritor.address){
                prescritor.address = {}
            }
            $scope.prescritor.crm = $scope.prescritor.typeNumber + " " + $scope.prescritor.number
            apiService.createPrescritor(prescritor).then(data => {
                toast.success('Prescritor cadastrado com sucesso!', 3000)
                $rootScope.loading = false
                $location.path('/adm/prescritores')
            }).catch(function(error){
                $rootScope.loading = false
                toast.error('Erro ao cadastrar o prescritor!', 3000)
            })
        }

        $scope.updatePrescritor = (prescritor) => {
            $rootScope.loading = true
            $scope.prescritor.crm = $scope.prescritor.typeNumber + " " + $scope.prescritor.number
            apiService.updatePrescritor(prescritor).then(data => {
                toast.success('Prescritor editado com sucesso!', 3000)
                $rootScope.loading = false
                $location.path('/adm/prescritores')
            }).catch(function(error){
                toast.error('Erro ao editar o prescritor!', 3000)
                $rootScope.loading = false
            })
        }

        $scope.deletePrescritor = (id) => {
            apiService.deletePrescritor(id).then(data => {
                $scope.getPrescritorList()
                toast.success('Prescritor excluido com sucesso!', 3000)
            }).catch(function(error){
                toast.error('Erro ao excluir o prescritor!', 3000)
            })
        }

        $scope.getPrescritorList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getPrescritors(name).then(data => {
                $scope.prescritorList = data.data.content
            }).catch(function(error){
                toast.error('Erro ao buscar a lista de prescritores!', 3000)
            })
        }

        $scope.saveMedicament = (medicament) => {
            $rootScope.loading = true
            let apresentationList = []
            let comercialNameList = []
            medicament.apresentations.forEach(function (element) {
                apresentationList.push(element.value)
            });
            medicament.comercialNames.forEach(function (element) {
                comercialNameList.push(element.value)
            });
            medicament.apresentations = apresentationList
            medicament.comercialNames = comercialNameList
            var interations = {};
            medicament.interations.forEach(function (element) {
                var id = element.medicament.id
                interations[id] = element.description
            })
            medicament.interations = interations
            apiService.createMedicament(medicament).then(data => {
                toast.success('Medicamento cadastrado com sucesso!', 3000)
                $rootScope.loading = false
                $location.path('/adm/medicamentos')
            }).catch(function(error){
                $rootScope.loading = false
                toast.error('Erro ao cadastrar o medicamento!', 3000)
            })
        }

        $scope.updateMedicament = (medicament) => {
            let apresentationList = []
            let comercialNameList = []
            medicament.apresentations.forEach(function (element) {
                apresentationList.push(element.value)
            });
            medicament.comercialNames.forEach(function (element) {
                comercialNameList.push(element.value)
            });
            medicament.apresentations = apresentationList
            medicament.comercialNames = comercialNameList
            var interations = {};
            medicament.interations.forEach(function (element) {
                var id = element.medicament.id
                interations[id] = element.description
            })
            medicament.interations = interations
            apiService.updateMedicament(medicament).then(data => {
                toast.success('Medicamento editado com sucesso!', 3000)
                $location.path('/adm/medicamentos')
            }).catch(function(error){
                toast.error('Erro ao editar o medicamento!', 3000)
            })
        }

        $scope.deleteMedicament = (id) => {
            apiService.deleteMedicament(id).then(data => {
                $scope.getMedicamentList()
                toast.success('Medicamento excluido com sucesso!', 3000)
            }).catch(function(error){
                toast.error('Erro ao excluir o medicamento!', 3000)
            })
        }

        $scope.getMedicamentList = (name) => {
            if (name === "") {
                name = null
            }
            apiService.getMedicaments(name).then(data => {
                $scope.medicamentList = data.data.content
            }).catch(function(error){
                toast.error('Erro ao buscar a lista de medicamentos!', 3000)
            })
        }

        $scope.addInteracao = (medicament) => {
            const interation = {
                /* medicament: medicament,
                description: "" */
            }
            medicament.interations.push(interation)
        }

        $scope.addInput = (medicament, list) => {
            const obj = {}
            if (list === 'apresentation') {
                medicament.apresentations.push(obj)
            } else if (list === 'commercialName') {
                medicament.comercialNames.push(obj)
            }
        }

        $scope.removeInput = (medicament, input, list) => {
            let index = 0;
            if (list === 'apresentation') {
                index = medicament.apresentations.indexOf(input)
                medicament.apresentations.splice(index, 1)
            } else if (list === 'commercialName') {
                index = medicament.comercialNames.indexOf(input)
                medicament.comercialNames.splice(index, 1)
            }
        }

        $scope.openModal = (modal, id) => {
            $scope.idDelete = id
            $('#' + modal).modal()
        }

        $scope.getUseTypeList = (name) => {
            apiService.getUseTypeList(name).then(data => {
                $scope.useTypeList = data.data.content
            }), function (err) {
                toast.error('Erro ao buscar a lista de tipo de uso!', 3000)
            }
        }

        $scope.getUnityList = (name) => {
            apiService.getUnityList(name).then(data => {
                $scope.unityList = data.data.content
            }), function (err) {
                toast.error('Erro ao buscar a lista de unidades!', 3000)
            }
        }

        $scope.saveUseType = (useType) => {
            if (useType.id) {
                apiService.updateUseType(useType).then(data => {
                    toast.success('Tipo de uso editado com sucesso!', 3000)
                    $scope.getUseTypeList()
                }), function (err) {
                    toast.error('Erro ao salvar o tipo de uso!', 3000)
                }
            } else {
                apiService.createUseType(useType).then(data => {
                    toast.success('Tipo de uso cadastrado com sucesso!', 3000)
                    $scope.getUseTypeList()
                }), function (err) {
                    toast.error('Erro ao salvar o tipo de uso!', 3000)
                }
            }
            delete $scope.useType
        }

        $scope.saveUnity = (unity) => {
            if (unity.id) {
                apiService.updateUnity(unity).then(data => {
                    toast.success('Unidade editada com sucesso!', 3000)
                    $scope.getUnityList()
                }), function (err) {
                    toast.error('Erro ao salvar a unidade!', 3000)
                }
            } else {
                apiService.createUnity(unity).then(data => {
                    toast.success('Unidade cadastrada com sucesso!', 3000)
                    $scope.getUnityList()
                }), function (err) {
                    toast.error('Erro ao salvar a unidade!', 3000)
                }
            }
            delete $scope.unity
        }

        $scope.deleteUseType = (id) => {
            apiService.deleteUseType(id).then(data => {
                toast.success('Tipo de uso excluído com sucesso!', 3000)
                $scope.getUseTypeList()
            }), function (err) {
                toast.error('Erro ao excluir o tipo de uso!', 3000)
            }
        }

        $scope.deleteUnity = (id) => {
            apiService.deleteUnity(id).then(data => {
                toast.success('Unidade excluída com sucesso!', 3000)
                $scope.getUnityList()
            }), function (err) {
                toast.error('Erro ao excluir a unidade!', 3000)
            }
        }

        $scope.openModalCreateAndUpdate = (entity) => {
            if (entity) {
                $scope.useType = entity
                $scope.unity = entity
            } else {
                delete $scope.useType
                delete $scope.unity
            }
            $('#modal-create-update').modal()
        }

        $scope.logout = () => {
            AuthService.logout()     
            $location.path('login')       
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