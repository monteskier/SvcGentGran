angular.module("gentGran")
.controller("LoginController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){

  $scope.login = function(){
    if($rootScope.login == 'login'){
      $http({
        method:"POST",
        url:"admin/login",
        data:{name:$scope.name, password:$scope.password}
      }).then(function succes(request){
          if(request.data.login==true){
            $rootScope.msg = request.data.msg;
            $rootScope.flag=true;
            
            $rootScope.session = request.data.session;
            $rootScope.login="logout";
            $timeout(setTimeout,3000);
        }else{
            $rootScope.flag=true;
            $rootScope.msg = request.data.msg;
            $timeout(setTimeout,3000);
        }
      });
    }
  };
  function setTimeout(){
    $rootScope.flag = false;
  }

}]);
