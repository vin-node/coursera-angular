(function(){
  'use strict'
  angular.module('common')
  .service('UserService',UserService);
  function UserService(){
    var service = this;
    service.saveUser = function(userObject){
      service.user = userObject;
    }
    service.getUser = function (){
      return service.user;
    }
  }
})();
