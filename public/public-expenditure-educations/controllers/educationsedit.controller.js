/* global angular $scope $routeParams  */
var app = angular.module("App");

app.controller("EducatiosEditCtrl", ["$scope","$http","$routeParams","$location", "ngDialog", function ($scope,$http,$routeParams,$location,ngDialog){
    
    
    console.log("EducatiosEditCtrl initialized!");
    
    $scope.url = "/api/v2/public-expenditure-educations/" + $routeParams.country +"/"+ $routeParams.year ;
    
    
    
    
    $http.get($scope.url).then(function (res){
            
      
            $scope.data = { status: res.status,
                                   datos:  res.data  
                                };
                                
        
            
    });
    
    
    /*--------------------Function message status------------------------*/
    
    
     function message(res){
            
            
			switch (res.status) {
			    
			    
			    
				case 200:
				    $scope.message = {msg: "La operación se ha completado con éxito", type: "success"};
					break;
				case 201:
					$scope.message  = {msg: "La operación se ha completado con éxito", type: "success"};
					break;
				case 400:
					$scope.message  = {msg: "Datos inválidos", type: "warning"};
					break;
				case 404:
					$scope.message  = {msg: "No se encuentra el recurso", type: "warning"};
					break;
				case 405:
					$scope.message  = {msg: "Operación no permitida", type: "danger"};
					break;
				case 409:
					$scope.message  = {msg: "El recurso ya existe", type: "warning"};
					break;
				default:
					$scope.message  = {msg: "La operación se ha completado con éxito", type: "success"};
			}
			
			
			 ngDialog.open({
                    template: '/public-expenditure-educations/views/messageEdit.html',
                    className: 'ngdialog-theme-default',
                    scope:$scope
                });    
            
            
        }
    
    
    $scope.update = function (){
        
        
        console.log("update initialized!");
         
        
        $http.put($scope.url ,$scope.data.datos).then(function (res){
            
            
            $scope.dataUpdate = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            $location.path("/ui/v1/public-expenditure-educations");
            
        }).catch(function(res){
            
            $scope.dataUpdate = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                               };
                               
                
                message(res)
                
        
            
            
        });
    }
    
}]);