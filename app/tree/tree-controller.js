function TreeCtrl($scope,$rootScope, Mediator) {
  // Data is passed in by the Mediator
  $scope.treeData = Mediator.treeData;

  $scope.treeOptions = {
    nodeChildren: "children",
    dirSelectable: true,
    injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
    }
  }

  // Broadcast the "node.selected" event for all registered modules to act upon
  $scope.showSelected = function(sel) {
    Mediator.broadcastMessage("tree.node.selected",sel);
  }

  $scope.filterNodesByType = function(arr,types) {
    var flag = false;

    for (var i = arr.length - 1; i >= 0; i--) {
      if(arr[i].children) { 
        flag = $scope.filterNodesByType(arr[i].children, types);
      }
    }

    for (var i = arr.length - 1; i >= 0; i--) {
      if(!flag && types.indexOf(arr[i].type) == -1) {
        arr[i].visible = false;
      } else {
        flag = true;
      }
    }
    return flag;
  }

  $scope.removeFilter = function (arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if(arr[i].children) { 
        $scope.removeFilter(arr[i].children);
      }
    }

    for (var i = arr.length - 1; i >= 0; i--) {
      arr[i].visible = true;
    }
  }

  // Act upon the "types.changed" event broadcasted by the filter module
  $scope.$on('filter.types.changed', function (){
    selectedTypes = Mediator.arg;
    $scope.removeFilter($scope.treeData);
    if(selectedTypes.length > 0) {
      $scope.filterNodesByType($scope.treeData, selectedTypes);  
    }
  });
}

TreeCtrl.$inject = ['$scope','$rootScope','Mediator'];


  



