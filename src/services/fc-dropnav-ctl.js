'use strict';

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