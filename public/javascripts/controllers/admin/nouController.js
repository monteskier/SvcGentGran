angular.module("gentGran")
.controller("NouController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){
  $scope.nou = function(){
  console.log("Bien hasta aqui 2");
  //var fd = new FormData();
  //fd.append('file', post.file);
  /*
  $http({
    method:"POST",
    url:"admin/save",
    data:{"post":$scope.post, "file":fd}
  }).then(function(results){
    $rootScope.flag=true;
    $rootScope.msg = results.data.msg;
    //$location.path('llista');
    $timeout(setTimeout,3000);
  });
  */
};
/*function setTimeout(){
  $rootScope.flag = false;
}*/
}]);
