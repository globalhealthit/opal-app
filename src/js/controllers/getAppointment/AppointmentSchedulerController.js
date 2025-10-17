// SPDX-FileCopyrightText: Copyright (C) 2023 Opal Health Informatics Group at the Research Institute of the McGill University Health Centre <john.kildea@mcgill.ca>
//
// SPDX-License-Identifier: Apache-2.0

(function () {
    'use strict';

    angular
        .module('OpalApp')
        .controller('AppointmentSchedulerController', AppointmentSchedulerController);

    AppointmentSchedulerController.$inject = [
        '$sce', 'UserHospitalPreferences', 'Navigator'
    ];

    /* @ngInject */
    function AppointmentSchedulerController($sce, UserHospitalPreferences, Navigator) {
        let vm = this;

        // variable to let the user know which hospital they are logged in
        vm.selectedHospitalToDisplay = "";
        
        vm.appointmentUrl = appointmentUrl;
        vm.showInfo = showInfo;

        activate();

        //////////////////////////////////////////////////

        /*
         * PRIVATE METHODS
         * =================================
         */

        function activate() {
            Navigator.setNavigator(appointmentNavigator);
            configureSelectedHospital();
        }

        /**
         * @name configureSelectedHospital
         * @desc Set the hospital name to display
         */
        function configureSelectedHospital() {
            vm.selectedHospitalToDisplay = UserHospitalPreferences.getHospitalFullName();
            console.log('Hospital Display Name:', vm.selectedHospitalToDisplay);
        }

        /*
         * PUBLIC METHODS
         * =========================================
         */

        /**
         * @name appointmentUrl
         * @desc Returns the trusted URL for the appointment scheduler iframe
         */
        function appointmentUrl() {
            return $sce.trustAsResourceUrl('https://openemrprodtest.shoprideon.com/portal/');
            // return $sce.trustAsResourceUrl('https://rpm.shoprideon.com/#/login');

        }

        /**
         * @name showInfo
         * @desc Navigate to the info page for appointments
         */
        function showInfo() {
            appointmentNavigator.pushPage('views/tabs/info-page-tabs.html', {id:'appointment'});
        }
    }
})();