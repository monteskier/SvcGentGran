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


}]).config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider){
  'use strict';
  $locationProvider.html5Mode('true');

  $routeProvider.when('/detall',{
    templateUrl:"templates/public/detall.html",
    controller:"public/SeleccioController"
  });


}]);
