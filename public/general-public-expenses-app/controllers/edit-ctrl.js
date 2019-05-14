/* global angular */
var app = angular.module("GeneralPublicExpensesApp");

app.controller("GeneralEditCtrl", ["$scope", "$http", "$routeParams", function ($scope,$http,$routeParams){
                console.log("GeneralEditCtrl initialized");
                $scope.url = "/api/v1/general-public-expenses";
                
                var name = $routeParams.name;
                
               console.log("Requesting earnings inter stats to <"+$scope.url+">...");
                    $http.get($scope.url+"/"+name).then(function (response){
                        console.log("Data received: " + JSON.stringify(response.data,null,2));
                        $scope.generalPublicExpenses = response.data;
                    });
                
               // $scope.data = {country: "espania", year: 2015, publicSpending: 1, educationExpense: 1, healthExpense: 1, 
            //    defenseSpending: 1, publicSpendingPib: 1, var_: 1};
               
                
                $scope.updateGeneralPublicExpenses = function (country, year){
                    console.log("Updating GeneralPublicExpenses: "+ country + " y " + year);
                    $http.put($scope.url+"/"+country+"/"+year, $scope.data).then(function (response){
                        console.log("PUT response: " + response.status + " " + response.data);
                        
                    });
                }
}]);