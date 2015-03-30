/*global angular*/

'use strict';

angular.module('codeet', [
    'ngRoute',
    'ui.ace'
])

    .config(['$locationProvider', '$sceProvider', function ($locationProvider, $sceProvider) {
        // .html5Mode(true)
        $locationProvider.hashPrefix('!');
        $sceProvider.enabled(false);
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/editor.html',
                controller: 'EditorCtrl'
            })
    }])

    .factory('DocumentService', ['$http', '$q', function ($http, $q) {
        return {
            get: function () {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (window.codeet) {
                            resolve(window.codeet);
                        } else {
                            resolve({
                                data: {
                                    name: 'Untitled Document',
                                    body: ''   
                                }
                            });
                        }
                    }, 1000);
                });
            }
        };
    }]);

// Initialize application
angular.element(document).ready(function() {
    angular.bootstrap(angular.element(document), ['codeet']);
});