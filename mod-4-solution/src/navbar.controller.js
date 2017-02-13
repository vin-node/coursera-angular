(function(){
  angular.module("MenuApp")
  .controller("NavbarController", NavbarController);
  NavbarController.$inject = ['$location'];
  function NavbarController($location){
    var navbarCtrl = this;
    navbarCtrl.isActive= function (path) {
      if(path.length<=1){
        return path === $location.path();
      }
      else{
        return $location.path().includes(path);
      }
    };
  }
})();
