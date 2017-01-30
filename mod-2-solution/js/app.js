(function(){
  'use strict'

  var appModule = angular.module('ShoppingListCheckOff',[]);
  appModule.controller('ToBuyController',toBuyController);
  appModule.controller('AlreadyBoughtController',alreadyBoughtController);
  appModule.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  toBuyController.$inject=['ShoppingListCheckOffService'];
  function toBuyController(ShoppingListCheckOffService){
    var toBuyCtrl = this;
    toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();
    toBuyCtrl.shoppingComplete = false;
    toBuyCtrl.shopForItem = function(itemIndex){
      ShoppingListCheckOffService.shopItem(itemIndex);
      if(toBuyCtrl.items.length===0){
        toBuyCtrl.shoppingComplete = true;
      }
    };
  };
  alreadyBoughtController.$inject=['ShoppingListCheckOffService','$scope'];
  function alreadyBoughtController(ShoppingListCheckOffService,$scope){
    var boughtCtrl = this;
    boughtCtrl.shoppingStarted = false;
    boughtCtrl.items = ShoppingListCheckOffService.getItemsAlreadyBought();
    $scope.$watch(angular.bind(this, function () {
      return this.items.length;
    }),
    function (newValue) {
        if(newValue>0){
          boughtCtrl.shoppingStarted = true;
        }
    });
  };
  function ShoppingListCheckOffService(){
    var service = this;
    var itemsToBuy = [{name:'Laptop',quantity:'1'},{name:'Monitor',quantity:'1'},{name:'Mouse',quantity:'1'},{name:'Phone',quantity:'1'},{name:'Pen',quantity:'1'},{name:'Pad',quantity:'1'}];
    var itemsAlreadyBought = [];

    service.getItemsToBuy = function(){
        return itemsToBuy;
    };
    service.getItemsAlreadyBought = function(){
        return itemsAlreadyBought;
    };
    service.shopItem=function (itemIndex){
      var itemBought = itemsToBuy[itemIndex];
      itemsToBuy.splice(itemIndex,1);
      itemsAlreadyBought.push(itemBought);
    };
  };

})();
