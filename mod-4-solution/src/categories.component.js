(function(){
  angular.module("MenuApp")
  .component('categoriesList',{
    templateUrl: 'src/templates/categories.template.html',
    bindings:{
      list:'<'
    }
    ,
    controller: CategoryListComponentController
  });

  CategoryListComponentController.$inject = ['$scope', '$element']
  function CategoryListComponentController($scope, $element) {
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
