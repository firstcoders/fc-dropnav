'use strict';

/**
 * @ngdoc directive
 * @name fc-dropnav.directive:fcDropnav
 * @description
 * # fcDropNav
 */
angular.module('fc-dropnav')
  .directive('fcDropnavHandle', function (fcDropnavCtrl) {
    return {
      restrict: 'EA',
      link: function postLink($scope, element, attrs) {
        element.bind('click', function() {
          fcDropnavCtrl.toggle();
        });
      }
    };
  });
