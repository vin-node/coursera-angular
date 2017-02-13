(function () {
'use strict';
angular.module("data")
.service("MenuDataService",MenuDataService)
.constant('RestaurentApiBasePath',"https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http','$q','RestaurentApiBasePath'];
function MenuDataService($http,$q,RestaurentApiBasePath){
  var service = this;
  service.getAllCategories = function (){
    var deferred = $q.defer();
    $http({
      method:'GET',
      url:(RestaurentApiBasePath+"/categories.json")
    })
    .success(function(data) {
      deferred.resolve(data);
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
      url:(RestaurentApiBasePath+"/menu_items.json?category="+categoryShortName)
    })
    .success(function(data) {
      deferred.resolve(data.menu_items);
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
      url:(RestaurentApiBasePath+"/menu_items.json")
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
