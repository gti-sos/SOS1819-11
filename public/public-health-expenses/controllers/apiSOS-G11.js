/* global angular FusionCharts*/
var app = angular.module("App");

var data = [];
var countries = [];

app.controller("apiSOS-G11", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-G11 initialized!");

    // var remoteAPI = "/proxySOS-G11";

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            if (!countries.includes(response.data[i].country)) {
                data.push({ label: response.data[i].country, value: response.data[i].healthExpense });
                countries.push(response.data[i].country);
            }

        }

        console.log(data);

        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {

                if (!countries.includes(response.data[i].country)) {
                    data.push({ label: response.data[i].country, value: response.data[i].totalPublicExpense });
                    countries.push(response.data[i].country);
                }

            }

            console.log(data);

            // const dataSource = {
            //     chart: {
            //         caption: "Recommended Portfolio Split",
            //         subcaption: "For a net-worth of $1M",
            //         showvalues: "1",
            //         showpercentintooltip: "0",
            //         numberprefix: "$",
            //         enablemultislicing: "1",
            //         theme: "fusion"
            //     },
            //     data: [{
            //             label: "Equity",
            //             value: "300000"
            //         },
            //         {
            //             label: "Debt",
            //             value: "230000"
            //         },
            //         {
            //             label: "Bullion",
            //             value: "180000"
            //         },
            //         {
            //             label: "Real-estate",
            //             value: "270000"
            //         },
            //         {
            //             label: "Insurance",
            //             value: "20000"
            //         }
            //     ]
            // };

            const dataSource = {
                chart: {
                    caption: "Publishing Trend",
                    subcaption: "Comparative",
                    xaxisname: "Countries",
                    yaxisname: "Expenses",
                    formatnumberscale: "1",
                    plottooltext: "<b>$dataValue</b> in $label",
                    theme: "fusion"
                },
                data: data
            };

            FusionCharts.ready(function() {
                var myChart = new FusionCharts({
                    type: "pie3d",
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
