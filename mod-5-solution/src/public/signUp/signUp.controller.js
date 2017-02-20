(function () {
"use strict";

  angular.module('public')
  .controller('SignUpController',SignUpController);
  SignUpController.$inject = ['MenuService','UserService','$location'];
  function SignUpController(MenuService, UserService,$location){
    var signUpCtrl = this;
    signUpCtrl.user = {};
    signUpCtrl.message= "";
    signUpCtrl.subscribe = function () {
      signUpCtrl.completed = true;

      var promise = MenuService.getMenuItems(signUpCtrl.user.favoriteMenu);
       promise.then(function(response){
        if(response.menu_items.length>0){
          signUpCtrl.user.favoriteMenu = signUpCtrl.user.favoriteMenu;
          signUpCtrl.user.favoriteMenuName = response.category.name;
          UserService.saveUser(signUpCtrl.user);
          signUpCtrl.message ="";
          $location.path('/myInfo');
        }
        else{
          signUpCtrl.message = "Invalid menu number";
        }
       })
       .catch(function (error) {
         console.log("Something went terribly wrong.");
       });
    };
  }
})();
