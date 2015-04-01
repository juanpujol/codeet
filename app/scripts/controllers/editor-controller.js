/*global angular*/

'use strict';

// http://jsfiddle.net/h6LxLjt0/

angular.module('codeet')
    
    .controller('EditorCtrl', [
        '$scope', 
        '$rootScope',
        '$routeParams',
        function ($scope, $rootScope, $routeParams) {
            $scope.aceConfig = {
                theme: 'twilight',
                mode: 'html',
                onLoad: $scope.aceLoaded
            };

            $scope.document = {
                data: {
                    name: 'Untitled Document',
                    body: ''
                }
            };

            $rootScope.$watch('codeetDocument', function () {
                console.log($rootScope.codeetDocument);
            });

            $scope.aceLoaded = function (editor) {
                console.log('Ace Loaded', editor);

                if (window.opener) {
                    window.opener.postMessage({ message: 'codeet-loaded' }, $routeParams.origin);  
                };
            };

            $scope.save = function () {
                if ($scope.document && $scope.document.opener) {
                    $scope.document.data.message = 'codeet-save';
                    $scope.document.opener.source.postMessage($scope.document.data, $scope.document.opener.origin);
                };
            };

            $scope.close = function () {
                /*
                    TODO: Verify if document changed and prompt alert
                    to confirm before closing.
                */
                window.close();

                if (window.opener) {
                    window.opener.postMessage({ message: 'codeet-closed' }, $routeParams.origin);  
                };
            };
        }
    ])