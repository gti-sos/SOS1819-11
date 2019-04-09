/* global angular */
var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("MainCtrl initialized!");

    $scope.url = "/api/v1/public-health-expenses";
    
    $scope.query="";

    $scope.send = {
        country: "france",
        year: 2017,
        publicHealthExpense: 82.99,
        healthExpense: 217528.3,
        totalPublicExpense: 16.97,
        healthExpensePib: 9.51,
        healthExpenditurePerCapita: 3247,
        var_: 3.80
    };

    $scope.get = function(query) {
        $http.get($scope.url+query).then(function(response) {
            $scope.state = JSON.stringify(response.status, null, 2);
            $scope.data = JSON.stringify(response.data, null, 2);
        }).catch(function(response) {
            $scope.state = JSON.stringify(response.status, null, 2);
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };

    $scope.delete = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.state = JSON.stringify(response.status, null, 2);
            $scope.data = JSON.stringify(response.data, null, 2);
        }).catch(function(response) {
            $scope.state = JSON.stringify(response.status, null, 2);
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };

    $scope.post = function(send) {
        $http.post($scope.url, $scope.send).then(function(response) {
            $scope.state = JSON.stringify(response.status, null, 2);
            $scope.data = JSON.stringify(response.data, null, 2);
        }).catch(function(response) {
            $scope.state = JSON.stringify(response.status, null, 2);
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };

    $scope.put = function(send) {
        $http.put($scope.url, $scope.send).then(function(response) {
            $scope.state = JSON.stringify(response.status, null, 2);
            $scope.data = JSON.stringify(response.data, null, 2);
        }).catch(function(response) {
            $scope.state = JSON.stringify(response.status, null, 2);
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };

}]);
