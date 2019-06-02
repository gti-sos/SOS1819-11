/* global angular Taucharts */
var app = angular.module("App");

var defData = [];

app.controller("apiSOS-G05", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-G05 initialized!");

    var remoteAPI = "/proxySOS-G05";

    $http.get(remoteAPI + "/api/v1/athletes-performance-sport/").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            defData.push({ type: 'us', count: response.data[i].total, date: response.data[i].year + i });

        }

        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                defData.push({ type: 'bug', count: response.data[i].publicHealthExpense, date: response.data[i].year + i });

            }

            console.log(defData);


            // var defData = [{
            //     type: 'us',
            //     count: 0,
            //     date: '12-2013'
            // }, {
            //     type: 'us',
            //     count: 10,
            //     date: '01-2014'
            // }, {
            //     type: 'us',
            //     count: 15,
            //     date: '02-2014'
            // }, {
            //     type: 'us',
            //     count: 12,
            //     date: '03-2014'
            // }, {
            //     type: 'us',
            //     count: 16,
            //     date: '04-2014'
            // }, {
            //     type: 'us',
            //     count: 13,
            //     date: '05-2014'
            // }, {
            //     type: 'bug',
            //     count: 21,
            //     date: '01-2014'
            // }, {
            //     type: 'bug',
            //     count: 19,
            //     date: '02-2014'
            // }, {
            //     type: 'bug',
            //     count: 23,
            //     date: '03-2014'
            // }, {
            //     type: 'bug',
            //     count: 26,
            //     date: '04-2014'
            // }, {
            //     type: 'bug',
            //     count: 23,
            //     date: '05-2014'
            // }];

            var chart = new Taucharts.Chart({
                guide: {
                    padding: { l: 70, t: 10, b: 70, r: 10 },
                    showGridLines: 'xy',
                    color: {
                        brewer: {
                            us: 'color-us',
                            bug: 'color-bug'
                        }
                    },
                    y: {
                        label: {
                            text: 'Count of completed entities',
                            padding: 50
                        }
                    },
                    x: {
                        label: 'Month',
                        tickMin: 1800,
                        tickMax: 3400,
                        autoScale: false
                    }
                },
                data: defData,
                type: 'line',
                x: 'date',
                y: 'count',
                color: 'type'
            });

            chart.renderTo('#line');

        });

    });

}]);
