(function () {
'use strict';

angular.module("MenuApp")
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories-list.template.html',
    controller: 'CategoryListController as catgCtrl',
    resolve: {
      categoriesList : ['MenuDataService',function(MenuDataService){
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('itemsList', {
    url: '/itemsList/{shortName}',
    templateUrl: 'src/templates/items-list.template.html',
    controller: 'ItemListController as itemsCtrl',
    resolve: {
      itemsList : ['$stateParams','MenuDataService',function($stateParams, MenuDataService){
        return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }
  });
}

})();
