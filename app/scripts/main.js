/*global angular*/

'use strict';

angular.module('codeet', [
    'ngRoute',
    'ui.ace'
])

    .config([
        '$locationProvider', 
        '$sceProvider', 
        function ($locationProvider, $sceProvider) {
            $locationProvider.hashPrefix('!');
            $sceProvider.enabled(false);
    }])

    // Routing Setup
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/editor.html',
                controller: 'EditorCtrl'
            })
    }])

// Initialize Application
angular.element(document).ready(function() {
    angular.bootstrap(angular.element(document), ['codeet']);
});