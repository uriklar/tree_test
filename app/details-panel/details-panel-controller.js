var DetailsPanelCtrl = function($scope,Mediator) {
  $scope.$on('tree.node.selected', function (){
    $scope.node = Mediator.arg;
  });
}

DetailsPanelCtrl.$inject = ['$scope','Mediator'];