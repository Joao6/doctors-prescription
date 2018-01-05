'use strict'
angular.module('prescritor')
    .controller('pacientController', function ($scope, $rootScope, $location, prescriptionInfo) {
        $rootScope.loading = false
        if (prescriptionInfo) {
            $scope.prescription = prescriptionInfo.data
            $('#qrcode').qrcode("https://qr-code-app.herokuapp.com/#/paciente/prescricao/" + $scope.prescription.id);
        }
    })