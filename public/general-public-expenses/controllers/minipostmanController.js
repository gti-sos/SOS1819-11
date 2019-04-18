/* global angular $scope $routeParams */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("Inicializado ----> MainCtrl");
    $scope.url = "/api/v1/general-public-expenses";

    //LoadInitialData

    $scope.loadInitialData = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };


    // GET

    $scope.send = function() {
        $http.get($scope.url).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    // POST

    $scope.post = function() {
        $http.post($scope.url, $scope.body).then(function(response) {
            $scope.status = response.status;
            $scope.data = "";
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    // PUT

    $scope.put = function() {
        $http.put($scope.url, $scope.body).then(function(response) {
            $scope.status = response.status;
            $scope.data = "";
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    // DELETE

    $scope.delete = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.status = response.status;
            $scope.data = "";
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };
}]);
