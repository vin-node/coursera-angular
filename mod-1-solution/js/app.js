(function(){
  'use strict'
  var appModule = angular.module('LunchCheck',[]);
  appModule.controller('LunchCheckController',lunchCheckController);
  lunchCheckController.$inject=['$scope'];
  function lunchCheckController($scope){
    $scope.lunchMenu="";
    $scope.message="";
    $scope.separator =",";
    $scope.checkMenu = function(){
      var itemsArray = $scope.lunchMenu.split($scope.separator);
      var validItemCount = getValidItemCount(itemsArray);

      if($scope.lunchMenu.length===0||validItemCount===0){
        $scope.message = "Please enter data first";
        $scope.fontColor ="red";
        $scope.borderColor = "invalid";
        return;
      }
    /*



    asdf'pkdsapfkpdoskfas

    */



      $scope.fontColor ="green";
      $scope.borderColor = "valid";

      if(validItemCount>3){
        $scope.message = "Too Much!";
      }
      else{
        $scope.message = "Enjoy!";
      }
    }
  };
  function getValidItemCount(items){
    var count = 0;
    items.forEach(function(entry) {
        if(entry&&(entry.trim()).length>0){
          count++;
        }
    });
    return count;
  }

})();
