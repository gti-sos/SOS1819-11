/* global angular vis*/
var app = angular.module("App");

var items = [];

app.controller("apiSOS-G07", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-G07 initialized!");

    var remoteAPI = "/proxySOS-G07";

    $http.get(remoteAPI + "/api/v1/earnings-inter-stats/").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {
            items.push({ x: response.data[i].territoryTotal - response.data[i].territory, y: response.data[i].territory });
        }

        console.log(items);

        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                items.push({ x: response.data[i].totalPublicExpense - response.data[i].healthExpensePib, y: response.data[i].totalPublicExpense });
            }

            console.log(items);

            // for (var i = 0; i < 100; i++) {
            //     items.push({ x: new Date('2014-06-11').valueOf() + Math.floor(Math.random() * 30000), y: 500 + (Math.random() * 100) });
            // }

            var container = document.getElementById('visualization');
            var dataset = new vis.DataSet(items);
            var options = {
                sort: false,
                sampling: false,
                style: 'points',
                dataAxis: {
                    left: {
                        range: {
                            min: 0,
                            max: 50
                        }
                    }
                },
                drawPoints: {
                    enabled: true,
                    size: 6,
                    style: 'circle' // square, circle
                },
                defaultGroup: 'Scatterplot',
                height: '600px'
            };
            var graph2d = new vis.Graph2d(container, dataset, options);

        });

    });

}]);
