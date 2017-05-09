angular.module("gentGran")
.controller("NouController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){

  $scope.desar = function(){
  console.log("Bien hasta aqui 2");
  var fd = new FormData();
  fd.append('post', $scope.post);
  fd.append('image', $scope.sampleImage);
  fd.append('file', $scope.sampleFile);
  console.log(fd);

  $http({
    method:"POST",
    url:"admin/save",
    data:fd,
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
