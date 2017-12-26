angular.module('prescritor').factory('apiService', function ($http, config) {

    const _getUserById = (id) => {
        return $http.get(config.baseUrl + '/doctors/' + id)
    }

    const _getPrescritors = (name) => {
        return $http.get(config.baseUrl + '/doctors', { params: { "name": name } })
    }

    const _updatePrescritor = prescritor => {
        return $http.put(config.baseUrl + '/doctors/' + prescritor.id, prescritor)
    }

    const _createPrescritor = prescritor => {
        return $http.post(config.baseUrl + '/doctors', prescritor)
    }

    const _deletePrescritor = id => {
        return $http.delete(config.baseUrl + '/doctors/' + id)
    }

    const _getMedicamentById = id => {
        return $http.get(config.baseUrl + '/medicaments/' + id)
    }

    const _getMedicaments = (name) => {
        return $http.get(config.baseUrl + '/medicaments', { params: { "name": name } })
    }

    const _updateMedicament = medicament => {
        return $http.put(config.baseUrl + '/medicaments/' + medicament.id, medicament)
    }

    const _createMedicament = medicament => {
        return $http.post(config.baseUrl + '/medicaments', medicament)
    }

    const _deleteMedicament = id => {
        return $http.delete(config.baseUrl + '/medicaments/' + id)
    }

    const _getPacientList = (name) => {
        return $http.get(config.baseUrl + '/pacients', { params: { "name": name } })
    }

    const _updatePacient = pacient => {
        return $http.put(config.baseUrl + '/pacients/' + pacient.id, pacient)
    }

    const _createPacient = pacient => {
        return $http.post(config.baseUrl + '/pacients', pacient)
    }

    const _deletePacient = id => {
        return $http.delete(config.baseUrl + '/pacients/' + id)
    }

    const _createPrescription = prescription => {
        return $http.post(config.baseUrl + '/prescriptions', prescription)
    }

    const _updatePrescription = prescription => {
        return $http.put(config.baseUrl + '/prescriptions/' + prescription.id, prescription)
    }

    const _deletePrescription = id => {
        return $http.delete(config.baseUrl + '/prescriptions/' + id)
    }

    const _getPrescriptions = () => {
        return $http.get(config.baseUrl + '/prescriptions')
    }

    const _getPrescriptionById = (idPrescription) => {
        return $http.get(config.baseUrl + '/prescriptions/' + idPrescription)
    }

    const _getPacientById = (idPacient) => {
        return $http.get(config.baseUrl + '/pacients/' + idPacient)
    }

    const _createUseType = (useType) => {
        return $http.post(config.baseUrl + '/usetypes', useType)
    }

    const _createUnity = (unity) => {
        return $http.post(config.baseUrl + '/unity', unity)
    }

    const _updateUseType = (useType) => {
        return $http.put(config.baseUrl + '/usetypes/' + useType.id, useType)
    }

    const _updateUnity = (unity) => {
        return $http.put(config.baseUrl + '/unity/' + unity.id, unity)
    }

    const _deleteUseType = (id) => {
        return $http.delete(config.baseUrl + '/usetypes/' + id)
    }

    const _deleteUnity = (id) => {
        return $http.delete(config.baseUrl + '/unity/' + id)
    }

    const _getUseTypeList = (name) => {
        return $http.get(config.baseUrl + '/usetypes', { params: { 'name': name } })
    }

    const _getUnityList = (name) => {
        return $http.get(config.baseUrl + '/unity', { params: { 'name': name } })
    }

    const _getPosologiaList = (description) => {
        return $http.get(config.baseUrl + '/posologias', { params: { 'description': description } })
    }

    const _createPosologia = (posologia) => {
        return $http.post(config.baseUrl + '/posologias', posologia)
    }


    return {
        getUserById: _getUserById,
        getPrescritors: _getPrescritors,
        updatePrescritor: _updatePrescritor,
        createPrescritor: _createPrescritor,
        deletePrescritor: _deletePrescritor,
        getMedicamentById: _getMedicamentById,
        getMedicaments: _getMedicaments,
        updateMedicament: _updateMedicament,
        createMedicament: _createMedicament,
        deleteMedicament: _deleteMedicament,
        getPacientList: _getPacientList,
        updatePacient: _updatePacient,
        createPacient: _createPacient,
        deletePacient: _deletePacient,
        createPrescription: _createPrescription,
        getPrescriptions: _getPrescriptions,
        getPrescriptionById: _getPrescriptionById,
        getPacientById: _getPacientById,
        updatePrescription: _updatePrescription,
        deletePrescription: _deletePrescription,
        createUseType: _createUseType,
        createUnity: _createUnity,
        updateUseType: _updateUseType,
        updateUnity: _updateUnity,
        deleteUseType: _deleteUseType,
        deleteUnity: _deleteUnity,
        getUseTypeList: _getUseTypeList,
        getUnityList: _getUnityList,
        getPosologiaList: _getPosologiaList,
        createPosologia: _createPosologia
    }
})