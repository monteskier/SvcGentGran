angular.module("gentGran")
.controller("EditarController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){

$scope.carregarDades = function(){
  $http({
    method:"post",
    url:"admin/getPost",
    data:{"id":$rootScope.objId}
  }).then(function(results){
    console.log(results);
    $scope.post = results.data.data;
  });
  $scope.editar = function(){

  var fd = new FormData();

  fd.append('data',angular.toJson($scope.post));
    $http({
    method:"POST",
    url:"admin/editPost",
    data:fd,
    headers: { 'Content-Type': undefined}
  }).then(function(results){
      $rootScope.flag=true;
      $rootScope.msg = results.data.msg;
      $timeout(setTimeout,3000);
      $location.path("/llista");
  });

};

function setTimeout(){
  $rootScope.flag = false;
}
};
}]);
