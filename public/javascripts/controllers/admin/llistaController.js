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
  $scope.editar = function(id){
  $rootScope.objId = id;
  $location.path("/editar");
  }
  $scope.eliminar = function(id, img=null, file=null){
    $http({
      method:"POST",
      url:"admin/drop",
      data:{"id":id,"img":img,"file":file}
    }).then(function(request){
      $rootScope.msg = request.data.msg;
      $rootScope.flag=true;
      $scope.obtindreResultats();
    });
  };
  function setTimeout(){
    $rootScope.flag= false;
  }
}]);
