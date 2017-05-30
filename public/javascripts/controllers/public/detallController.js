angular.module("gentGran")
.controller("detallController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){

$scope.tornar = function(){
  location.path("/");
};

$scope.getPost = function(){
  var id = $rootScope.id;
  $http({
      method:"post",
      url:"getPost",
      data:{id:id}
  }).then(function(results){
    $scope.post = results.data.data;
  });
};

}]);
