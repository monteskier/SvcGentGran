angular.module('gentGran')
  .controller("SeleccioController",['$rootScope','$scope','$location', function($rootScope, $scope, $location){
    'use strict';
    $scope.carregar = function(opcio){
      $rootScope.tipusOpcio = opcio;
      $location.path('/'+opcio);
    };

  }]);
