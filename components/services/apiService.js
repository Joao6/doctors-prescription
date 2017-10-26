angular.module('prescritor').factory('apiService', function ($http, config) {

    const _getUserById = (id) => {
        return $http.get(config.baseUrl + '/prescritors/' + id)
    }

    const _getPrescritors = (name) => {
        return $http.get(config.baseUrl + '/prescritors', { params: { "name": name } })
    }

    const _updatePrescritor = prescritor => {
        return $http.put(config.baseUrl + '/prescritors/' + prescritor.id, prescritor)
    }

    const _createPrescritor = prescritor => {
        return $http.post(config.baseUrl + '/prescritors', prescritor)
    }

    const _deletePrescritor = id => {
        return $http.delete(config.baseUrl + '/prescritors/' + id)
    }

    const _getMedicamentById = id => {
        return $http.get(config.baseUrl + '/medicaments/' + id)
    }

    const _getMedicaments = (name) => {
        return $http.get(config.baseUrl + '/medicaments', { params: { "name": name } })
    }

    const _getUseTypeList = (name) => {
        return $http.get(config.baseUrl + '/useTypes', { params: { "name": name } })
    }

    const _getUnityList = (name) => {
        return $http.get(config.baseUrl + '/unities', { params: { "name": name } })
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

    const _getPrescriptions = () => {
        return $http.get(config.baseUrl + '/prescriptions')
    }
     
    const _getPrescriptionById = (idPrescription) => {
        return $http.get(config.baseUrl + '/prescriptions/'+idPrescription)
    }

    const _getPacientById = (idPacient) => {
        return $http.get(config.baseUrl + '/pacients/'+idPacient)
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
        getUseTypeList: _getUseTypeList,
        getUnityList: _getUnityList
    }
})