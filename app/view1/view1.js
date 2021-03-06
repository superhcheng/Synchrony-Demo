'use strict';

angular.module('myApp.view1', [
    'ngRoute',
    'mgcrea.ngStrap',
    'ngAnimate',
    'toaster',
    'angularSpinner',
    'angular-ladda',
    'jcs-autoValidate',
    'ui.mask'
])
    .run([
        'bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
            bootstrap3ElementModifier.enableValidationStateIcons(true);
        }])

    .config(['$routeProvider', 'laddaProvider', function ($routeProvider, laddaProvider) {

        laddaProvider.setOption({
            style: 'expand-right'
        });

        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'RegisterCtrl'
        });
    }])
    .controller('RegisterCtrl', ['$scope', '$location', '$modal', 'usSpinnerService', 'CFService', function ($scope, $location, $modal, usSpinnerService, CFService) {
        $scope.cfService = CFService;

        $scope.$watch('app_ssn', function(val, oldVal) {
            console.log('app_ssn= \'' + val + '\'');
        });

        $scope.$watch('testForm.$valid', function(val, oldVal) {
            console.log('$watch testForm.$valid ' + val);
        });

        $scope.app_initPurAmt = null;
        $scope.app_income = null;
        $scope.app_firstName = null;
        $scope.app_middleName = null;
        $scope.app_lastName = null;
        $scope.app_suffix = "";
        $scope.app_dob = null;
        $scope.app_ssn = null;

        $scope.app_housetype = null;
        $scope.app_address = null;
        $scope.app_apt = null;
        $scope.app_city = null;
        $scope.app_state = null;
        $scope.app_zip = null;

        $scope.app_phone = null;
        $scope.app_email = null;


        $scope.autoPayName = null
        $scope.autoPay_routing = null;
        $scope.autoPay_bankacct = null;
        $scope.autoPay_cardnum = null;
        $scope.autoPay_expiration = null;
        $scope.autoPay_securityCode = null;


        $scope.showBureauModal = function () {
            $scope.createModal = $modal({
                scope: $scope,
                template: 'view1/templates/modal.bureau.tpl.html',
                show: true
            });
        };

        $scope.showCreateModal = function () {
            $scope.createModal = $modal({
                scope: $scope,
                template: 'view1/templates/modal.offers.tpl.html',
                show: true
            });
        };

        $scope.showAutoPayModal = function () {
            $scope.createModal.hide();
            $scope.createModal = $modal({
                scope: $scope,
                template: 'view1/templates/modal.autopay.tpl.html',
                show: true
            });
        };
    }])
    .directive('ccSpinner', function () {
        return {
            'restrict': 'AEC',
            'templateUrl': "view1/templates/spinner.html",
            'scope': {
                'isLoading': '=',
                'message': '@'
            }
        };
    })

    .directive('validateSsn', function () {
        var SSN_REGEXP = /^(?!000)(?!666)(?!9)\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/;
        var ssnPattern = {
            3: '-',
            5: '-'
        };
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                var formatSSN = function () {
                    console.log("Chengcheng");
                    var sTempString = ctrl.$viewValue;
                    sTempString = sTempString.replace(/\-/g, '');
                    var numbers = sTempString;
                    var temp = '';
                    for (var i = 0; i < numbers.length; i++) {
                        temp += (ssnPattern[i] || '') + numbers[i];
                    }
                    ctrl.$viewValue = temp;

                    scope.$apply(function () {
                        elem.val(ctrl.$viewValue);
                    });

                };
                ctrl.$parsers.unshift(function (viewValue) {
                    // test and set the validity after update.
                    var valid = SSN_REGEXP.test(viewValue);
                    ctrl.$setValidity('ssnValid', valid);
                    return viewValue;
                });
                // This runs when we update the text field
                ctrl.$parsers.push(function (viewValue) {

                    var valid = SSN_REGEXP.test(viewValue);
                    ctrl.$setValidity('ssnValid', valid);
                    return viewValue;
                });
                elem.bind('blur', formatSSN);

            }
        };
    })
    .service('CFService', function ($http, toaster, $q) {
        var self = {
            'step1Complete': null,
            'step2Complete': null,
            'step3Complete': null,
            'step4Complete': null,
            'autoPayType': null,
            'test': null
        };
        return self;
    });