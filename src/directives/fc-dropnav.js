'use strict';

/**
 * @ngdoc directive
 * @name fc-dropnav.directive:fcDropnav
 * @description
 * # fcDropNav
 */
angular.module('fc-dropnav', [])
  .directive('fcDropnav', function ($document, $rootScope, fcDropnavCtrl) {

    return {
      restrict: 'EA',
      link: function postLink($scope, element, attrs) {

        angular.element.addClass('fc-dropnav-navbar');

        $scope.$watch(function() {
            return fcDropnavCtrl.isOpen();
        }, function(val) {
            var body = angular.element($document[0].body);

            if (val) {
                body.addClass('fc-dropnav-open');
            } else {
                body.removeClass('fc-dropnav-open');
            }

        });
      }
    };
  });
