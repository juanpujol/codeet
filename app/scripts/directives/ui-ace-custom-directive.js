/*global angular*/

'use strict';

angular.module('codeet')

    .directive('uiAce', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                // More initial setup for ace
                element.css({ fontSize: '18px' });

                scope.aceConfig = {
                    theme: 'twilight',
                    mode: 'html',
                    onLoad: scope.aceLoaded
                };

                var editor = ace.edit('editor');
                editor.setShowPrintMargin(false);

                // Setup status bar
                var StatusBar = ace.require('ace/ext/statusbar').StatusBar;
                var statusBarInstance = new StatusBar(editor, document.getElementById('statusbar'));

                // Update content on document
                $rootScope.$watch('codeetDocument', function (newValue, oldValue) {
                    if(newValue) {
                        scope.document = newValue;
                        console.log('codeetDocument watcher...');
                    };
                });
            }
        }
    }]);