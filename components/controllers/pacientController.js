'use strict'
angular.module('prescritor')
    .controller('pacientController', function ($scope, $rootScope, $location, prescriptionInfo) {
        $rootScope.loading = false
        if (prescriptionInfo) {
            $scope.prescription = prescriptionInfo.data
            $('#qrcode').qrcode("http://localhost:3000/!#/paciente/prescricao/" + $scope.prescription.id);
        }
    })