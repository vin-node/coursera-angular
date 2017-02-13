(function () {
'use strict';
module.("data")
.service("MenuDataService",MenuDataService);

MenuDataService.$inject = ['$http','$q'];
function MenuDataService($http,$q){
  var service = this;
  service.getAllCategories = function (){
    var deferred = $q.defer();
    $http({
      method:'GET',
      url:"https://davids-restaurant.herokuapp.com/categories.json"
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
  service.getItemsForCategory = function (categoryShortName){
    var deferred = $q.defer();
    $http({
      method:'GET',
      url:"https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName
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
