'use strict';

/**
 * @ngdoc directive
 * @name fc-dropnav.directive:fcDropnavToggle
 * @description
 * # fcDropNav
 */
angular.module('fc-dropnav')
  .directive('fcDropnavToggle', function ($document, fcDropnavCtrl) {

    return {
      restrict: 'EA',
      scope: {
        keyCode: '=fcDropnavToggle'
      },
      link: function postLink($scope, element, attrs) {
        $document.bind("keyup", function(event) {
          if(event.which === $scope.keyCode &&
            ['INPUT', 'TEXTAREA'].indexOf(angular.element(event.srcElement)[0].tagName) === -1
          ) {
            fcDropnavCtrl.toggle();
          }
        });
      }
    };
  });
