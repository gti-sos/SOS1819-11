/* global angular */

var app = angular.module("App"); //, ["chart.js"]

// var data = [];

app.controller("apiSOS-angular-chart", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-angular-chart initialized!");

    // $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {
    //     for (var i = 0; i < response.data.length; i++) {
    //         data.push([response.data[i].country, response.data[i].healthExpenditurePerCapita]);
    //     }

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };
}]);
