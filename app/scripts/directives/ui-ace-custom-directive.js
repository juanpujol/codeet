/*global angular*/

'use strict';

angular.module('codeet')

    .directive('uiAce', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {

                var editor, StatusBar, statusBarInstance;

                // More initial setup for ace
                element.css({ fontSize: '20px' });

                scope.aceConfig = {
                    theme: 'twilight',
                    mode: 'html',
                    onLoad: scope.aceLoaded,
                    require: ['ace/ext/emmet'],
                    advanced: {
                        enableEmmet: true
                    }
                };

                editor = ace.edit('editor');
                editor.setShowPrintMargin(false);

                // Setup status bar
                StatusBar = ace.require('ace/ext/statusbar').StatusBar;
                statusBarInstance = new StatusBar(editor, document.getElementById('statusbar'));
            }
        }
    }]);