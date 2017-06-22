angular.module("gentGran")
.controller("LoginController", ['$scope', '$location', '$http', '$rootScope', '$timeout', function($scope, $location, $http, $rootScope, $timeout ){
  $scope.logout = function(){

  if($rootScope.login=="logout"){
    $http({
      method:"get",
      url:"admin/logout"
    }).then(function(results){
      $rootScope.msg = results.data.msg;
      $rootScope.flag=false;
      $rootScope.login="login";
      $rootScope.session=results.data.session;
      window.location.replace('/');
      $timeout(setTimeout,3000);
    });
  }
};
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
          $location.path('llista');
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
