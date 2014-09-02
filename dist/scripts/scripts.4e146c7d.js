"use strict";var app=angular.module("testAppApp",["ngResource","treeControl","xeditable"]).run(["editableOptions",function(a){a.theme="bs3"}]).factory("TreeData",["$resource",function(a){return a("data.json")}]).factory("Mediator",function(a,b){var c={};return c.arg=null,c.treeData=b.query(),c.broadcastMessage=function(b,c){this.arg=c,a.$broadcast(b)},c.nodeTypes=["container","image","heading","button"],c}),TreeCtrl=function(a,b,c){a.treeData=c.treeData,a.treeOptions={nodeChildren:"children",dirSelectable:!0,injectClasses:{ul:"a1",li:"a2",liSelected:"a7",iExpanded:"a3",iCollapsed:"a4",iLeaf:"a5",label:"a6",labelSelected:"a8"}},a.showSelected=function(a){c.broadcastMessage("tree.node.selected",a)},a.filterNodesByType=function(b,c){for(var d=!1,e=b.length-1;e>=0;e--)b[e].children&&(d=a.filterNodesByType(b[e].children,c));for(var e=b.length-1;e>=0;e--)d||-1!=c.indexOf(b[e].type)?d=!0:b[e].visible=!1;return d},a.removeFilter=function(b){for(var c=b.length-1;c>=0;c--)b[c].children&&a.removeFilter(b[c].children);for(var c=b.length-1;c>=0;c--)b[c].visible=!0},a.$on("filter.types.changed",function(){selectedTypes=c.arg,a.removeFilter(a.treeData),selectedTypes.length>0&&a.filterNodesByType(a.treeData,selectedTypes)})};TreeCtrl.$inject=["$scope","$rootScope","Mediator"];var DetailsPanelCtrl=function(a,b){a.$on("tree.node.selected",function(){a.node=b.arg})};DetailsPanelCtrl.$inject=["$scope","Mediator"];var FilterCtrl=function(a,b){a.types=b.nodeTypes,a.selection=[],a.toggleSelection=function(c){var d=a.selection.indexOf(c);d>-1?a.selection.splice(d,1):a.selection.push(c),b.broadcastMessage("filter.types.changed",a.selection)}};FilterCtrl.$inject=["$scope","Mediator"];