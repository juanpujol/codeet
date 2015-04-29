/*global angular*/

'use strict';

// http://jsfiddle.net/h6LxLjt0/

angular.module('codeet')
    
    .controller('EditorCtrl', [
        '$scope', 
        '$rootScope',
        '$routeParams',
        function ($scope, $rootScope, $routeParams) {

            function keydownListener(event) {
                if (event.ctrlKey || event.metaKey) {
                    switch (String.fromCharCode(event.which).toLowerCase()) {
                    case 's':
                        event.preventDefault();
                        $scope.save();
                        break;
                    }
                }
            }

            $scope.$on('destroy', function () {
                $(window).unbind('keydown', keydownListener);
            });

            $(window).bind('keydown', keydownListener);
            console.log($scope, $rootScope);

            $scope.$watch('editorForm', function (newValue) {
                $rootScope.editorForm = newValue;
            });


            $scope.document = {
                data: {
                    name: 'Untitled Document',
                    body: ''
                }
            };

            // Update content on document
            $rootScope.$watch('codeetDocument', function (newValue, oldValue) {
                if(newValue) {
                    $scope.document = newValue;
                    $scope.editorForm.$setPristine();
                };
            });

            $scope.aceLoaded = function (editor) {
                if (window.opener) {
                    window.opener.postMessage({ message: 'codeet-loaded' }, $routeParams.origin);  
                };
            };

            $scope.save = function () {
                if ($scope.editorForm.$dirty && $scope.document && $scope.document.opener) {
                    $scope.document.data.message = 'codeet-save';
                    $scope.document.opener.source.postMessage($scope.document.data, $scope.document.opener.origin);
                    $scope.editorForm.$setPristine();

                    if(!$rootScope.$$phase) {
                      $rootScope.$apply();
                    }
                };
            };

            $scope.close = function () {

                window.close();

                if (window.opener) {
                    window.opener.postMessage({ message: 'codeet-closed' }, $routeParams.origin);  
                };
            };

        }
    ])