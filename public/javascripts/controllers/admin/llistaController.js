angular.module("gentGran")
.controller("LlistaController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){
  $scope.obtindreResultats = function(){
    $http({
      method:"GET",
      url:"admin/llista"
    }).then(function(request){
        $scope.posts = request.data;
    });
  };
}]);
