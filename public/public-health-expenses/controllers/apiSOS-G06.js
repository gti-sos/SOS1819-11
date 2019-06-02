/* global angular FusionCharts*/
var app = angular.module("App");

var category = [];
var data = [];
var data6 = [];

app.controller("apiSOS-G06", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-G06 initialized!");

    var remoteAPI = "/proxySOS-G06";

    $http.get(remoteAPI + "/api/v1/uefa-country-rankings/").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            category.push({ label: response.data[i].country });
            data6.push({ value: response.data[i].points });

        }

        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {

                data.push({ value: response.data[i].healthExpense });

            }

            console.log(category);
            console.log(data6);
            console.log(data);

            const dataSource = {
                chart: {
                    caption: "App Publishing Trend",
                    subcaption: "Comparative",
                    xaxisname: "Countries",
                    yaxisname: "Total number",
                    formatnumberscale: "1",
                    plottooltext: "<b>$dataValue</b> on <b>$seriesName</b> in $label",
                    theme: "fusion"
                },
                categories: [{
                    category: category
                }],
                dataset: [{
                        seriesname: "API G-06",
                        data: data6
                    },
                    {
                        seriesname: "MY API",
                        data: data
                    }
                ]
            };

            // const dataSource = {
            //     chart: {
            //         caption: "App Publishing Trend",
            //         subcaption: "2012-2016",
            //         xaxisname: "Years",
            //         yaxisname: "Total number of apps in store",
            //         formatnumberscale: "1",
            //         plottooltext: "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
            //         theme: "fusion"
            //     },
            //     categories: [{
            //         category: [{
            //                 label: "2012"
            //             },
            //             {
            //                 label: "2013"
            //             },
            //             {
            //                 label: "2014"
            //             },
            //             {
            //                 label: "2015"
            //             },
            //             {
            //                 label: "2016"
            //             }
            //         ]
            //     }],
            //     dataset: [{
            //             seriesname: "iOS App Store",
            //             data: [{
            //                     value: "125000"
            //                 },
            //                 {
            //                     value: "300000"
            //                 },
            //                 {
            //                     value: "480000"
            //                 },
            //                 {
            //                     value: "800000"
            //                 },
            //                 {
            //                     value: "1100000"
            //                 }
            //             ]
            //         },
            //         {
            //             seriesname: "Google Play Store",
            //             data: [{
            //                     value: "70000"
            //                 },
            //                 {
            //                     value: "150000"
            //                 },
            //                 {
            //                     value: "350000"
            //                 },
            //                 {
            //                     value: "600000"
            //                 },
            //                 {
            //                     value: "1400000"
            //                 }
            //             ]
            //         },
            //         {
            //             seriesname: "Amazon AppStore",
            //             data: [{
            //                     value: "10000"
            //                 },
            //                 {
            //                     value: "100000"
            //                 },
            //                 {
            //                     value: "300000"
            //                 },
            //                 {
            //                     value: "600000"
            //                 },
            //                 {
            //                     value: "900000"
            //                 }
            //             ]
            //         }
            //     ]
            // };

            FusionCharts.ready(function() {
                var myChart = new FusionCharts({
                    type: "mscolumn3d",
                    renderAt: "chart-container",
                    width: "100%",
                    height: "100%",
                    dataFormat: "json",
                    dataSource
                }).render();
            });

        });

    });

}]);
