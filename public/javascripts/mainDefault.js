var angularApp = angular.module('gentGran', ['ui.bootstrap','ngRoute','ngAnimate']);
angularApp.controller('MainDefaultController', ['$scope', '$location', '$rootScope','$http', '$timeout', function($scope, $location, $rootScope, $http, $timeout){
  'use strict';

  $scope.oneAtATime =false;
  $scope.totalItems = 0;
  $scope.currentPage = 1;
  $scope.itemsPerPage =  5;
  $scope.maxSize = 5;
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

  $scope.initApp = function(){
    $rootScope.flag = false;
    $rootScope.session = false;
    $rootScope.accio = "login";
    $http({
      method:"POST",
      url:"getAllElements"
    }).then(function(results){
      $scope.posts = results.data;
      $scope.totalItems = $scope.posts.length;
      console.log(results.data);
    });
  };

  function setTimeout(){
    $rootScope.flag = false;
    $rootScope.printFlag = false;
  }

  $scope.setPage = function(pageNo){
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function(){
    $log.log('Pagina canviada a :'+$scope.currentPage);
  };

  $scope.ferGran = function(id){
      $rootScope.id = id;
      $location.path("/detall");
  };

}]).config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider){
  'use strict';
  $locationProvider.html5Mode('true');

  $routeProvider.when('/seleccio',{
    templateUrl:"templates/public/selccio.html",
    controller:"seleccioController"
  });

  $routeProvider.when('/ajuntament',{
    templateUrl:"templates/public/ajuntament/index",
    controller:"ajuntamentController"
  });

  $routeProvider.when('/municipi',{
    templateUrl:"templates/public/municipi/index",
    controller:"municipiController"
  });

  $routeProvider.when('/serveis',{
    templateUrl:"templates/public/serveis/index",
    controller:"serveisController"
  });

  $routeProvider.when('/seue',{
    templateUrl:"templates/public/serveis/seue",
    controller:"seueController"
  });


}]);
