'use strict';
// Source: src/directives/fc-dropnav.js
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

            fcDropnavCtrl.set(attrs.isOpen === 'true')
        }
    };
});

// Source: src/directives/fc-dropnav-handle.js
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

// Source: src/directives/fc-dropnav-toggle.js
/**
 * @ngdoc directive
 * @name fc-dropnav.directive:fcDropnavToggle
 * @description
 * # fcDropNav
 */
angular.module('fc-dropnav')
  .directive('fcDropnavToggle', function ($document, fcDropnavCtrl, $rootScope) {
    return {
      restrict: 'EA',
      scope: {
        keyCode: '=fcDropnavToggle',
        callback: '&fcDropnavOnToggle',
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

            if ($scope.callback) {
                $scope.callback();
            }

            $rootScope.$emit('dropnavOnToggle');
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

// Source: src/services/fc-dropnav-ctl.js
/**
 * @ngdoc factory
 * @name fc-dropnav-ctrl.factory:fcDropnavCtrl
 * @description
 * # fcDropNavCtrl
 */
angular.module('fc-dropnav')
.factory('fcDropnavCtrl', function() {
    var open = false,
        changeCallback;

    return {
        toggle: function() {
            open = !open;
            changeCallback(open);
        },
        set: function(val) {
            open = val;
            if (changeCallback) {
                changeCallback(open);
            }
        },
        isOpen: function() {
            return open;
        },
        onChange: function(closure) {
            changeCallback = closure;
        }
    };
});