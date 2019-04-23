/* global angular  */
var app = angular.module("App");

app.controller("EducatiosListCtrl", ["$scope","$http","$httpParamSerializer", function ($scope,$http, $httpParamSerializer){
    
   
    
        
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
        
            
            
        }).catch(function(res){
            
            getList();
          
            
        });
        
        
    }
    
    
    
    
            /*--------------------Function message status------------------------*/
    
    
     
    
    
    
    
    $scope.deleteR = function (country, year){
        
        console.log("DeleteR  initialized!");
        
        $http.delete(url+"/"+country+"/"+year).then(function (res){
           
            
            $scope.deleteRecRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data ,null,2)   
                                };
                                

            getList();
            
        }).catch(function(res){
            
            $scope.deleteRecRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
                                

            
        });
        
        
    }
    
    $scope.deleteAll = function (){
        
        console.log("DeleteAll  initialized!");
        
        $http.delete(url).then(function (res){
           
            
            getList();

            
            
        }).catch(function(res){
            

           
            
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
             
            
            getList();
            
        }).catch(function(res){
            
            $scope.postRespuesta = { status: JSON.stringify(res.status,null,2),
                                   datos:  JSON.stringify(res.data,null,2)   
                                };
            

            getList();
            
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
           

            
            
        }).catch(function(res){
            
            $scope.getLista = { status: res.status,
                                   datos: res.data 
                                };

            
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

                }).catch(function(res){
                    
                    $scope.getLista = { status: res.status,
                                           datos: res.data 
                                        };
                   
                });
                
            }
        
    }
            
            
        
    

   
   
   
   
   
   
    
   
     
   getList();

   
}]);