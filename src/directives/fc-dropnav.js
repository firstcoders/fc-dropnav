'use strict';

/**
 * @ngdoc directive
 * @name fc-dropnav.directive:fcDropnav
 * @description
 * # fcDropNav
 */
angular.module('fc-dropnav', [])
.directive('fcDropnav', function ($document, $rootScope, fcDropnavCtrl, $timeout) {

    var body = angular.element($document[0].body);

    return {
        restrict: 'EA',
        link: function postLink($scope, element, attrs) {

            element.addClass('fc-dropnav-navbar');

            fcDropnavCtrl.onChange(function(isOpen) {
                //run in timeout so it is applied in the next digest loop
                $timeout(function() {
                    $scope.isOpen = isOpen;
                });

                if (isOpen) {
                    body.addClass('fc-dropnav-open');
                } else {
                    body.removeClass('fc-dropnav-open');
                }
            });

            fcDropnavCtrl.set(attrs.fcDropnavDefault === 'open')
        }
    };
});
