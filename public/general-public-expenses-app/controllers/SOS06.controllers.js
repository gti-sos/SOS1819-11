var app = angular.module("App");


app.controller("Api-sos06", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var apiPropia = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";
    var api06 = "https://sos1819-06.herokuapp.com/api/v1/transfer-stats";


    $http.get(api06).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                anychart.onDocumentReady(function() {
                    // create pie chart with passed data
                    var data = anychart.data.set([
                        [response1.data[0].team, response2.data[0].healthExpense],
                        [response1.data[1].team, response2.data[1].healthExpense],
                        [response1.data[2].team, response2.data[2].healthExpense],
                        [response1.data[3].team, response2.data[3].healthExpense],
                        [response1.data[4].team, response2.data[4].healthExpense]
                    ]);

                    var wealth = data.mapAs({ 'x': 0, 'value': 1 });

                    var chart = anychart.pie(wealth);
                    chart.labels()
                        .hAlign('center')
                        .position('outside')
                        .format('{%Value} healthExpense');

                    // set chart title text settings
                    chart.title('Gastos de salud y equipos');

                    // set legend title text settings
                    chart.legend()
                        // set legend position and items layout
                        .position('center-bottom')
                        .itemsLayout('horizontal')
                        .align('center');

                    // set container id for the chart
                    chart.container('container_anychart');
                    // initiate chart drawing
                    chart.draw();
                });
            });
    });


}]);
