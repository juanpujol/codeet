"use strict";angular.module("codeet",["ngRoute","ui.ace"]).config(["$locationProvider","$sceProvider",function(a,b){a.hashPrefix("!"),b.enabled(!1)}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/editor.html",controller:"EditorCtrl"})}]).factory("DocumentService",["$http","$q",function(a,b){return{get:function(){return b(function(a){setTimeout(function(){a(window.codeet?window.codeet:{data:{name:"Untitled Document",body:""}})},1e3)})}}}]),angular.element(document).ready(function(){angular.bootstrap(angular.element(document),["codeet"])}),angular.module("codeet").controller("EditorCtrl",["$scope","$rootScope","$routeParams",function(a,b,c){a.aceConfig={theme:"twilight",mode:"html",onLoad:a.aceLoaded},a.document={data:{name:"Untitled Document",body:""}},b.$watch("codeetDocument",function(){console.log(b.codeetDocument)}),a.aceLoaded=function(){console.log("Ace Loaded"),window.opener&&window.opener.postMessage({message:"codeet-loaded"},c.origin)},a.save=function(){a.document&&a.document.opener&&(a.document.data.message="codeet-save",a.document.opener.source.postMessage(a.document.data,a.document.opener.origin))}}]),angular.module("codeet").directive("uiAce",["$rootScope",function(a){return{link:function(b,c){c.css({fontSize:"18px"});ace.edit("editor");a.$watch("codeetDocument",function(a,c){console.log(c,a),a&&(b.document=a,console.log(b.document))})}}}]);