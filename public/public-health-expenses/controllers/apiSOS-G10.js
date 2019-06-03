/* global angular vis*/
var app = angular.module("App");

var items = [];

app.controller("apiSOS-G10", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-G10 initialized!");

    var container = document.getElementById('visualization');

    var groups = new vis.DataSet();
    groups.add({ id: 0, content: "group0" });
    groups.add({ id: 1, content: "group1" });
    // groups.add({ id: 2, content: "group2" });

    var remoteAPI = "/proxySOS-G10";

    $http.get(remoteAPI + "/api/v1/e-car-statics/").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {
            if (i == 0) {
                items.push({ x: i + 10, y: response.data[i].marketPart, group: 0 });
            }
            else {
                items.push({ x: 10 * i + 10, y: response.data[i].marketPart, group: 0 });
            }
        }

        console.log(items);

        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                if (i == 0) {
                    items.push({ x: i + 10, y: response.data[i].healthExpensePib, group: 1 });
                }
                else {
                    items.push({ x: 10 * i + 10, y: response.data[i].healthExpensePib, group: 1 });
                }
            }

            console.log(items);

            // var items = [
            //     { x: '2014-06-11', y: 10, group: 0 },
            //     { x: '2014-06-12', y: 25, group: 0 },
            //     { x: '2014-06-13', y: 30, group: 0 },
            //     { x: '2014-06-14', y: 10, group: 0 },
            //     { x: '2014-06-15', y: 15, group: 0 },
            //     { x: '2014-06-16', y: 30, group: 0 },
            //     { x: '2014-06-11', y: 12, group: 1 },
            //     { x: '2014-06-12', y: 15, group: 1 },
            //     { x: '2014-06-13', y: 34, group: 1 },
            //     { x: '2014-06-14', y: 24, group: 1 },
            //     { x: '2014-06-15', y: 5, group: 1 },
            //     { x: '2014-06-16', y: 12, group: 1 },
            //     { x: '2014-06-11', y: 22, group: 2 },
            //     { x: '2014-06-12', y: 14, group: 2 },
            //     { x: '2014-06-13', y: 24, group: 2 },
            //     { x: '2014-06-14', y: 21, group: 2 },
            //     { x: '2014-06-15', y: 30, group: 2 },
            //     { x: '2014-06-16', y: 18, group: 2 }
            // ];

            var dataset = new vis.DataSet(items);
            var options = {
                style: 'bar',
                stack: true,
                barChart: { width: 50, align: 'center', sideBySide: false }, // align: left, center, right
                drawPoints: false,
                dataAxis: {
                    icons: true
                },
                orientation: 'top',
                // start: '2014-06-10',
                // end: '2014-06-18'
                start: 0,
                end: 100
            };
            var graph2d = new vis.Graph2d(container, items, groups, options);

        });

    });

}]);
