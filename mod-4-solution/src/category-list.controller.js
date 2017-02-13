(function(){
  angular.module("MenuApp")
  .controller("CategoryListController", CategoryListController);
  CategoryListController.$inject = ['categoriesList'];
  function CategoryListController(categoriesList){
    var catCtrl = this;
    catCtrl.categoriesList = categoriesList;
  }
})();
