/* global angular Chart */

var app = angular.module("App");

var positions = [];
var values = [];

app.controller("apiSOS-ext1", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-ext1 initialized!");

    var urlAPI = {
        method: 'GET',
        url: "https://www.balldontlie.io/api/v1/players",
        headers: {
            "Accept": "application/json"
        }
    };

    $http(urlAPI).then(function(response) {

        for (var i = 0; i < response.data.data.length; i++) {
            if (!positions.includes(response.data.data[i].position)) {
                positions.push(response.data.data[i].position);
            }
        }

        console.log(positions);

        for (var i = 0; i < positions.length; i++) {
            var n = 0;
            for (var j = 0; j < response.data.data.length; j++) {
                if (response.data.data[j].position == positions[i]) {
                    n = n + 1;
                }
            }
            values.push(n);
        }

        console.log(values);

        // var speedCanvas = document.getElementById("speedChart");

        // var speedData = {
        //     // labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
        //     labels: positions,
        //     datasets: [{
        //         label: "Players for position",
        //         // data: [0, 59, 75, 20, 20, 55, 40],
        //         data: values,
        //     }]
        // };

        // var chartOptions = {
        //     legend: {
        //         display: true,
        //         position: 'top',
        //         labels: {
        //             // boxWidth: 80,
        //             fontColor: 'black'
        //         }
        //     }
        // };

        // var lineChart = new Chart(speedCanvas, {
        //     type: 'line',
        //     data: speedData,
        //     options: chartOptions
        // });

        var birdsCanvas = document.getElementById("birdsChart");

        var birdsData = {
            // labels: ["Spring", "Summer", "Fall", "Winter"],
            labels: positions,
            datasets: [{
                // data: [1200, 1700, 800, 200],
                data: values,
                backgroundColor: [
                    "rgba(255, 0, 0, 0.5)",
                    "rgba(100, 255, 0, 0.5)",
                    "rgba(200, 50, 255, 0.5)",
                    "rgba(150, 50, 255, 0.5)",
                    "rgba(50, 50, 255, 0.5)",
                    "rgba(0, 100, 255, 0.5)"
                ]
            }]
        };

        var polarAreaChart = new Chart(birdsCanvas, {
            type: 'polarArea',
            data: birdsData
        });

    });

}]);
