angular.module("gentGran")
.controller("LoginController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){
  $scope.login = function(){
    if($rootScope.login == 'login'){
      $http({
        method:"POST",
        url:"admin/login",
        data:{name:$scope.name, password:$scope.password}
      }).then(function(results){
        if(results.data.login){
          $rootScope.msg = results.data.msg;
          $rootScope.flag=true;
          $rootScope.session=results.data.session;
          $rootScope.login="logout";
          //$location.path('llista');
          $timeout(setTimeout,3000);
        }else{
          $rootScope.msg = results.data.msg;
          $rootScope.flag=true;
          $timeout(setTimeout,3000);
        }
      });
    }
  };
  function setTimeout(){
    $rootScope.flag = false;
  }

}]);
