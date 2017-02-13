(function(){
  angular.module("MenuApp")
  .controller("ItemListController", ItemListController);
  ItemListController.$inject = ['itemsList'];
  function ItemListController(itemsList){
    var itemCtrl = this;
    itemCtrl.itemsList = itemsList;
  }
})();
