/* global angular */
var app = angular.module("App");

app.controller("GeneralEditCtrl", ["$scope", "$http", "$routeParams", "$location", function ($scope,$http,$routeParams,$location){
                console.log("GeneralEditCtrl initialized");
                $scope.url = "/api/v1/general-public-expenses/" + $routeParams.country + "/" + $routeParams.year;
                console.log($scope.url);
                $http.get($scope.url).then(function (res){
                    $scope.generalPublicExpenses = res.data;
                    });
                    
                
                
                var name = $routeParams.name;
                
               console.log("Requesting earnings inter stats to <"+$scope.url+">...");
                    $http.get($scope.url+"/"+name).then(function (response){
                        console.log("Data received: " + JSON.stringify(response.data,null,2));
                        $scope.generalPublicExpenses = response.data;
                    });
                
                //$scope.data = {country: "espania", year: 2015, publicSpending: 1, educationExpense: 1, healthExpense: 1, defenseSpending: 1, publicSpendingPib: 1, var_: 1};
               
                
                $scope.updateGeneralPublicExpenses = function (){
                    console.log("Updating GeneralPublicExpenses: "+ $scope.generalPublicExpenses.country + " y " + $scope.generalPublicExpenses.year);
                    $http.put($scope.url, $scope.generalPublicExpenses).then(function (response){
                        console.log("PUT response: " + response.status + " " + response.data);
                        
                    });
                    
                    $location.path("/ui/v1/general-public-expenses");
                }
}]);