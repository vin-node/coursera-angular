(function(){
  angular.module("MenuApp")
  .component('itemsList',{
    templateUrl: 'src/templates/items.template.html',
    bindings:{
      list:'<'
    }
    ,
    controller: ItemsListComponentController
  });

  ItemsListComponentController.$inject = ['$scope', '$element']
  function ItemsListComponentController($scope, $element) {
    var $ctrl = this;

    $ctrl.logItems = function () {
      if(!$ctrl.list){
        return;
      }
      for (var i = 0; i < $ctrl.list.length; i++) {
        var name = $ctrl.list[i].name;
        console.log("category name",name);
      }
    };
  }
})();
