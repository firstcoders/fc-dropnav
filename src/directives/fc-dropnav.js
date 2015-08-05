'use strict';

/**
 * @ngdoc directive
 * @name fc-dropnav.directive:fcDropnav
 * @description
 * # fcDropNav
 */
angular.module('fc-dropnav', ['ui.router', 'ngAnimate'])
  .directive('fcDropnav', function ($document, $rootScope) {

    return {
      // template: '<div></div>',
      restrict: 'EA',
      link: function postLink($scope, element, attrs) {

        $scope.menuOpen = false;

        $scope.toggleMenu = function() {
            $scope.menuOpen = !$scope.menuOpen;
        };

        $scope.setMenuOpen = function(open) {
            $scope.menuOpen = open;
        };

        $scope.isMenu = function() {
            return $scope.menuOpen;
        };

        $scope.$watch('menuOpen', function(val) {
            var body = angular.element($document[0].body);

            if (val) {
                body.addClass('fc-dropnav-open');
            } else {
                body.removeClass('fc-dropnav-open');
            }

        });

        //close the menu when navigating
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                $scope.setMenuOpen(false);
            }
        );
      }
    };
  });
