function FilterCtrl($scope,Mediator) {
  $scope.types = Mediator.nodeTypes;
  $scope.selection = [];
  $scope.toggleSelection = function toggleSelection(typeName) {
    var idx = $scope.selection.indexOf(typeName);

    // is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }

    // is newly selected
    else {
      $scope.selection.push(typeName);
    }

    Mediator.broadcastMessage("filter.types.changed",$scope.selection);
  };
}

FilterCtrl.$inject = ['$scope','Mediator'];