var app = angular.module("App");

app.controller("EducatiosListCtrl", ["$scope","$http","$httpParamSerializer","ngDialog", function ($scope,$http, $httpParamSerializer,ngDialog){
    
   
    
        
    var pag=0;

    
    
    console.log("EducatiosListCtrl initialized!");
    
    var url = "/api/v2/public-expenditure-educations"
    
    
    
    $scope.filterCountries = '';
    
    
                
    function getList(){

        
         console.log("Listado initialized!");
       
       
       
        
        $http.get(url+"?limit="+10+"&offset="+pag).then(function (res){
                
                $scope.getLista = { status: res.status,
                                       datos:  res.data  
                                    };
                
            }).catch(function(res){
                
                $scope.getLista = { status: res.status,
                                       datos: res.data 
                                    };
             
            });
    }
    
    
    
    $scope.loadInitialData = function (){
        
        console.log("loadInitialData  initialized!");
        
        $http.get(url+"/"+"loadInitialData").then(function (res){
           

            getList() ;              
            message(res); 
            
            
        }).catch(function(res){
            
            getList();
            message(res); 
            
        });
        
        
    }
    
    
    
    
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
                    template: '/public-expenditure-educations/views/messageList.html',
                    className: 'ngdialog-theme-default',
                    scope:$scope
                });    
            
            
        }
    
    
    
    
    $scope.deleteR = function (country, year){
        
        console.log("DeleteR  initialized!");
        
        $http.delete(url+"/"+country+"/"+year).then(function (res){
           
            
            $scope.deleteRecRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
                                
            message(res); 
            getList();
            
        }).catch(function(res){
            
            $scope.deleteRecRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
                                
            message(res); 
            
        });
        
        
    }
    
    $scope.deleteAll = function (){
        
        console.log("DeleteAll  initialized!");
        
        $http.delete(url).then(function (res){
           
            
            getList();
            message(res); 
            
            
        }).catch(function(res){
            
            message(res);
           
            
        });
        
        
    };

    
    
    $scope.add = function (data){
        
        
        console.log("AddR initialized!");
        $scope.normalMessage = "This is simple ng Dialog" 
         
        var data = $scope.data;
        
        $http.post(url,  data).then(function (res){
            
      
            $scope.postRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
            message(res);               
            
            getList();
            
        }).catch(function(res){
            
            $scope.postRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            
            message(res);
            
            
        });
        
        
         
            
            
            
    }
    
    
    $scope.search = function (){
        
        
        
         console.log("search initialized!");
         
         
         if ($scope.search.from) {
            $scope.search.from;
        }
        if ($scope.search.to) {
            $scope.search.to;
        }
        
        var query = $httpParamSerializer($scope.search);
        
    
    
        console.log("/api/v2/public-expenditure-educations?limit="+10+"&offset="+pag+"&"+query)
        
        $http.get(url+"?limit="+10+"&offset="+pag+"&"+query).then(function (res){
           
            
            $scope.getLista = { status: res.status,
                                   datos:  res.data  
                                };
           
            message(res); 
            
            
        }).catch(function(res){
            
            $scope.getLista = { status: res.status,
                                   datos: res.data 
                                };
            message(res); 
            
        });
        
       
        
    }

    
    
    
    $scope.pagination=function(num){
        
        
    
               if(num==1){
                   
                   
                    pag=pag-10;
                    
                    if(pag<0){
                        
                            pag=0;
                            
                            $http.get(url+"?limit="+10+"&offset="+pag).then(function (response){
                                
                                $scope.p = response.data;
                                console.log("pagination1")
                                
                                
                                getList();
                            });
                           
                    }else{
                        
                        
                        $http.get(url+"?limit="+10+"&offset="+pag).then(function (response){
                             $scope.p = response.data;
                             console.log("pagination2")
                           
                             getList();
                        });
                    }
               }else{
                  
                pag=pag+10;
                $http.get(url+"?limit="+10+"&offset="+pag).then(function (response){
                    $scope.p = response.data;
                     console.log("pagination3")
                     
                     getList();
               });
               
                 
             }
            }
            
        
        $scope.searchAll = function (){
        
            console.log("searchAll initialized!");
            
            
            /*Si le doy a enviar si nada*/
            
         
         
             if ($scope.search.country) {
                $scope.search.country;
            }
            if ($scope.search.year ) {
                $scope.search.year;
            }
            if ($scope.search.educationExpense) {
                $scope.search.educationExpense;
            }
            if ($scope.search.educationExpensePub) {
                $scope.search.educationExpensePub;
            }
            if ($scope.search.educationExpensePib) {
                $scope.search.educationExpensePib;
            }
            if ($scope.search.healthExpenditurePerCapita) {
                $scope.search.healthExpenditurePerCapita;
            }
            if ($scope.search.var_) {
                $scope.search.var_;
            }
            
            var query = $httpParamSerializer($scope.search);
            
            
            if((url+"?"+query) == (url+"?")){
                
                $scope.search = {};
                 getList();
                 
            }else{
            
                
                
            
                console.log(url+"?"+query);
                
                
                $http.get(url+"?"+query).then(function (res){
                   
                    console.log(res);
                    $scope.getLista = { status: res.status,
                                           datos:  res.data  
                    };
                    
                    $scope.search = {}
                    message(res); 
                }).catch(function(res){
                    
                    $scope.getLista = { status: res.status,
                                           datos: res.data 
                                        };
                    message(res);
                });
                
            }
        
    }
            
            
        
        $scope.button = function(){
            ngDialog.open({
                    template: 'searchAll',
                    className: 'ngdialog-theme-default',
                    scope: $scope,
               
                });
        } 
    
   
    
   
     
   getList();

   
}]);