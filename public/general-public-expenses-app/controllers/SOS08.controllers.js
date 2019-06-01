var app = angular.module("App");


app.controller("Api-sos08", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

var year = []
var touristDeparture = []
var publicSpending = []

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            year.push(response.data[i].year);
            touristDeparture.push(0);
            publicSpending.push(response.data[i].publicSpending);

        }
        
        $http.get("https://sos1819-08.herokuapp.com/API/v1/tourists-by-countries").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            year.push(response.data[i].year);
            touristDeparture.push(response.data[i].touristDeparture*100); //Multiplico por factor de 100 para que los valores se vean mejor en la gráfica
            publicSpending.push(0);

        }


        console.log(year);

        



        var data = {
            // A labels array that can contain any sort of values
            labels: year,
            // Our series array that contains series objects or in this case series data arrays
            series: [
                publicSpending,
                touristDeparture
            ]
        };

        var options = {
            //width: 300,
            height: 500
        };


        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line('.ct-chart', data, options);
        
    });
    
    });
}]);
