/*global angular*/

'use strict';

angular.module('codeet')

    .directive('uiAce', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.css({ fontSize: '18px' });

                var editor = ace.edit('editor');

                $rootScope.$watch('codeetDocument', function (newValue, oldValue) {
                    console.log(oldValue, newValue);

                    if(newValue) {
                        scope.document = newValue;
                        console.log(scope.document);
                    };
                });
            }
        }
    }])