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
        var isKeyCovered = function(e) {
          return (e.which === $scope.keyCode &&
            ['INPUT', 'TEXTAREA'].indexOf(angular.element(e.srcElement)[0].tagName) === -1
          );
        };

        var handleKeyDown = function(e) {
          //prevent space from scrolling down
          if(isKeyCovered(e) && e.which === 32) {
            e.preventDefault();
            return false;
          }
        };

        var handleKeyUp = function(e) {
          if(isKeyCovered(e)) {
            fcDropnavCtrl.toggle();
          }
        };

        //attach event handlers
        $document.bind("keydown", handleKeyDown);
        $document.bind("keyup", handleKeyUp);

        //on destroy remove handlers
        $scope.$on('$destroy', function() {
          $document.off(handleKeyDown);
          $document.off(handleKeyUp);
        });
      }
    };
  });
