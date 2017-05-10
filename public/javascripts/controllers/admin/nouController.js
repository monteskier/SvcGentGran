angular.module("gentGran")
.controller("NouController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){

  $scope.desar = function(){
  console.log("Bien hasta aqui 2");
  var image = document.getElementById("fileImg").files;
  var file = document.getElementById("file").files;
  var fd = new FormData();
  fd.append('data',angular.toJson($scope.post));
  fd.append('image', image[0]);
  fd.append('file', file[0]);
  console.log($scope.post);

  $http({
    method:"POST",
    url:"admin/save",
    data:fd,
    transformRequest: angular.identity,
    headers: { 'Content-Type': undefined}
  }).then(function(results){
    $rootScope.flag=true;
    $rootScope.msg = results.data.msg;
    //$location.path('llista');
    $timeout(setTimeout,3000);
  });

};

function setTimeout(){
  $rootScope.flag = false;
}
}]);
