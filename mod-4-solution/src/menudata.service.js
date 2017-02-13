(function () {
'use strict';
angular.module("data")
.service("MenuDataService",MenuDataService);

MenuDataService.$inject = ['$http','$q','$rootScope'];
function MenuDataService($http,$q,$rootScope){
  var service = this;
  service.getAllCategories = function (){
    var deferred = $q.defer();
    $rootScope.$broadcast('serviceCall:processing', { on: true });
    $http({
      method:'GET',
      url:"https://davids-restaurant.herokuapp.com/categories.json"
    })
    .success(function(data) {
      $rootScope.$broadcast('serviceCall:processing', { on: false });
      deferred.resolve(data);
    })
    .error(function() {
      $rootScope.$broadcast('serviceCall:processing', { on: false });
      deferred.reject("Error in getting Menu Items");
    });
    return deferred.promise;
  };
  service.getItemsForCategory = function (categoryShortName){
    var deferred = $q.defer();
    $rootScope.$broadcast('serviceCall:processing', { on: true });
    $http({
      method:'GET',
      url:"https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName
    })
    .success(function(data) {
      $rootScope.$broadcast('serviceCall:processing', { on: false });
      deferred.resolve(data.menu_items);
    })
    .error(function() {
      $rootScope.$broadcast('serviceCall:processing', { on: false });
      deferred.reject("Error in getting Menu Items");
    });
    return deferred.promise;
  };
  service.getMatchedMenuItems = function (searchTerm){
    var deferred = $q.defer();
    $rootScope.$broadcast('serviceCall:processing', { on: true });
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
      $rootScope.$broadcast('serviceCall:processing', { on: false });
      deferred.resolve(foundItems);
    })
    .error(function() {
      $rootScope.$broadcast('serviceCall:processing', { on: false });
      deferred.reject("Error in getting Menu Items");
    });
    return deferred.promise;
  };
}

})();
