'use strict';

/**
 * @ngdoc factory
 * @name fc-dropnav-ctrl.factory:fcDropnavCtrl
 * @description
 * # fcDropNavCtrl
 */
angular.module('fc-dropnav')
    .factory('fcDropnavCtrl', [function() {
        var open = false;

        return {
            toggle: function() {
                open = !open;
            },
            set: function(val) {
                open = val;
            }.
            isOpen = function() {
                return open;
            }
        };
    }]);