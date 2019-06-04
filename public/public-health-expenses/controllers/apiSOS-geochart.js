/* global angular google */

var app = angular.module("App");

var datos = [];

app.controller("apiSOS-geochart", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-geochart initialized!");

    $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            // var dato = [];
            // dato.push(response.data[i].country);
            // dato.push(response.data[i].healthExpense);
            // datos.push(dato);
            if (i == 0) {
                datos.push(['Country', 'Health expense']);
            }
            datos.push([response.data[i].country, response.data[i].healthExpense]);
        }

        console.log(datos);

        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(datos);
            // var data = google.visualization.arrayToDataTable([
            //     ['Country', 'Popularity'],
            //     ['Germany', 200],
            //     ['United States', 300],
            //     ['Brazil', 400],
            //     ['Canada', 500],
            //     ['France', 600],
            //     ['RU', 700]
            // ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }

    });

}]);
