/* global angular */

var app = angular.module("App"); //, ["chart.js"]

// var data = [];

app.controller("apiSOS-angular-chart", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-angular-chart initialized!");

    // $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {
    //     for (var i = 0; i < response.data.length; i++) {
    //         data.push([response.data[i].country, response.data[i].healthExpenditurePerCapita]);
    //     }

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];

    // });
}]);
