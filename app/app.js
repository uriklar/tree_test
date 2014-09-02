'use strict';

/**
 * @ngdoc overview
 * @name testAppApp
 * @description
 * # testAppApp
 *
 * Main module of the application.
 */
var app = angular.module('testAppApp', [
    'ngResource','treeControl','xeditable'
  ]).run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  })

app.factory('TreeData', ['$resource', function($resource) { 
    return $resource('data.json')
  }])

app.Factory('Mediator',function($rootScope, TreeData, $http) {
  	var mediator = {};

  	mediator.arg = null;

    mediator.treeData = TreeData.query();

  	mediator.broadcastMessage = function (msg,arg) {
  		this.arg = arg;
  		$rootScope.$broadcast(msg);
  	};

    mediator.nodeTypes = ["container","image","heading","button"];

  	return mediator;
  });
