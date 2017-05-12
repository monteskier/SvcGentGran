var angularApp = angular.module('gentGran', ['ui.bootstrap','ngRoute']);
angularApp.controller('MainDefaultController', ['$scope', '$location', '$rootScope','$http', '$timeout', function($scope, $location, $rootScope, $http, $timeout){
  'use strict';

  $scope.initApp = function(){
    $rootScope.flag = false;
    $rootScope.session = false;
    $rootScope.accio = "login";
    $http({
      method:"POST",
      url:"getAllElements"
    }).then(function(results){
      $scope.posts = results.data;
      console.log(results.data);
    });
  };
  function setTimeout(){
    $rootScope.flag = false;
    $rootScope.printFlag = false;
  }
}]).config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider){
  'use strict';
  $locationProvider.html5Mode('true');

  $routeProvider.when('/detall',{
    templateUrl:"templates/public/detall.html",
    controller:"public/SeleccioController"
  });


}]);
