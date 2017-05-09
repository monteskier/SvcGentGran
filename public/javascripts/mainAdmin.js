var angularApp = angular.module('gentGran', ['ui.bootstrap','ngRoute']);
angularApp.controller('MainAdminController', function($scope, $location, $rootScope){
  'use strict';

  $scope.initApp = function(){
    $rootScope.flag = false;
    $rootScope.session = false;
    $rootScope.login = "login";
  };

  function setTimeout(){
    $rootScope.flag = false;
    $rootScope.printFlag = false;
  }

}).config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider){
  'use strict';
  $locationProvider.html5Mode('true');

  $routeProvider.when('/seleccio',{
    templateUrl:"templates/admin/seleccio.html",
    controller:"SeleccioController"
  });

  $routeProvider.when('/llista',{
    templateUrl:"templates/admin/llista.html",
    controller:"LlistaController"
  });

  $routeProvider.when('/nou',{
    templateUrl:"templates/admin/nou.html",
    controller:"NouController"
  });
  $routeProvider.when('/editar',{
    templateUrl:"templates/admin/editar.html",
    controller:"EditarController"
  });
  $routeProvider.when('/login',{
    templateUrl:"templates/admin/login.html",
    controller:"LoginController"
  });

}]);
