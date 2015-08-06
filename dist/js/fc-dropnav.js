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

'use strict';

/**
 * @ngdoc directive
 * @name fc-dropnav.directive:fcDropnavToggle
 * @description
 * # fcDropNav
 */
angular.module('fc-dropnav')
  .directive('fcDropnavToggle', function ($document, fcDropnavCtrl) {

    // var body = angular.element($document[0].body);

    return {
      restrict: 'EA',
      scope: {
        keyCode: '=fcDropnavToggle'
      },
      link: function postLink($scope, element, attrs) {
        $document.bind("keyup", function(event) {
          if(event.which === $scope.keyCode) {
            fcDropnavCtrl.toggle();
          }
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc factory
 * @name fc-dropnav-ctrl.factory:fcDropnavCtrl
 * @description
 * # fcDropNavCtrl
 */
angular.module('fc-dropnav')
    .factory('fcDropnavCtrl', [function() {
        var open = false,
            changeCallback;

        return {
            toggle: function() {
                open = !open;
                changeCallback(open);
            },
            set: function(val) {
                open = val;
                changeCallback(open);
            },
            isOpen: function() {
                return open;
            },
            onChange: function(closure) {
                changeCallback = closure;
            }
        };
    }]);