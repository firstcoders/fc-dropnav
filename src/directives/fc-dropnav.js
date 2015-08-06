'use strict';

/**
 * @ngdoc directive
 * @name fc-dropnav.directive:fcDropnav
 * @description
 * # fcDropNav
 */
angular.module('fc-dropnav', [])
  .directive('fcDropnav', function ($document, $rootScope, fcDropnavCtrl) {

    var body = angular.element($document[0].body);

    return {
      restrict: 'EA',
      link: function postLink($scope, element, attrs) {

        element.addClass('fc-dropnav-navbar');

        $scope.fcDropnavCtrl = fcDropnavCtrl;

        fcDropnavCtrl.onChange(function(isOpen) {
            if (isOpen) {
                body.addClass('fc-dropnav-open');
            } else {
                body.removeClass('fc-dropnav-open');
            }
        })
      }
    };
  });
