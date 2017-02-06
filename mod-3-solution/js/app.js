(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',narrowItDownController )
.directive('foundItems', FoundItemsDirective)
.service('MenuSearchService',menuSearchService);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: DirectiveController,
    controllerAs: 'dirCtrl',
    bindToController: true
  };
  return ddo;
}
function DirectiveController(){
  var dirCtrl = this;
  dirCtrl.noItemsFound = function(){
    if(!this.items||this.items.lenght<=0){
      return true;
    }
    if(this.items.length>0){
      return false;
    }

  }
}
narrowItDownController.$inject = ['MenuSearchService'];
function narrowItDownController(MenuSearchService){
  var menuCtrl = this;
  menuCtrl.searchTerm = "";
  menuCtrl.searchForMenuItems = function (){
    if(menuCtrl.searchTerm.length<=0){
      menuCtrl.found = [];
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(menuCtrl.searchTerm);
    promise.then(function(response){
      menuCtrl.found = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };
  menuCtrl.removeItem = function (itemIndex) {
    menuCtrl.found.splice(itemIndex, 1);
  };
};

menuSearchService.$inject = ['$http','$q'];
function menuSearchService($http,$q){
  var service = this;
  service.getMatchedMenuItems = function (searchTerm){
    var deferred = $q.defer();
    $http({
      method:'GET',
      url:"https://davids-restaurant.herokuapp.com/menu_items.json"
    })
    .success(function(data) {
      var foundItems = [];
      for (var i = 0; i < data.menu_items.length; i++) {
          var description = data.menu_items[i].description;
          if (description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundItems.push(data.menu_items[i]);
          }
      }
      deferred.resolve(foundItems);
    })
    .error(function() {
      deferred.reject("Error in getting Menu Items");
    });
    return deferred.promise;
  };
}


})();
