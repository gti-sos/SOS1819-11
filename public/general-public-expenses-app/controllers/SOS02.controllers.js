var app = angular.module("App");


app.controller("Api-sos02", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var apiPropia = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";
    var api02 = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";


   $http.get(api02).then(function(response) {
       $http.get(apiPropia).then(function(response2) {
            anychart.onDocumentReady(function() {
                // create column chart
                var chart = anychart.column();

                // turn on chart animation
                chart.animation(true);

                // set chart title text settings
                chart.title('Recaudación internacional de películas españolas');

                // create area series with passed data
                var series = chart.column([
                    [response.data[0].name, response2.data[0].educationExpense],
                    [response.data[1].name, response2.data[1].educationExpense],
                    [response.data[2].name, response2.data[2].educationExpense],
                    [response.data[3].name, response2.data[3].educationExpense],
                    [response.data[4].name, response2.data[4].educationExpense]
                ]);

                // set series tooltip settings
                series.tooltip().titleFormat('{%X}');

                series.tooltip()
                    .position('center-top')
                    .anchor('center-bottom')
                    .offsetX(0)
                    .offsetY(5)
                    .format('{%Value}{groupsSeparator: }€');

                // set scale minimum
                chart.yScale().minimum(0);

                // set yAxis labels formatter
                chart.yAxis().labels().format('{%Value}{groupsSeparator: }€');

                // tooltips position and interactivity settings
                chart.tooltip().positionMode('point');
                chart.interactivity().hoverMode('by-x');

                // axes titles
                chart.xAxis().title('Película');
                chart.yAxis().title('Gasto Educación');

                // set container id for the chart
                chart.container('container_anychart');

                // initiate chart drawing
                chart.draw();
            });
});

});

}]);
