var app = angular.module("App");


app.controller("Api-sos08", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

// var year = []
// var touristDeparture = []
// var publicSpending = []

//     $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

//         for (var i = 0; i < response.data.length; i++) {

//             year.push(response.data[i].year);
//             touristDeparture.push(0);
//             publicSpending.push(response.data[i].publicSpending);

//         }
        
//         $http.get("https://sos1819-08.herokuapp.com/API/v1/tourists-by-countries").then(function(response) {

//         for (var i = 0; i < response.data.length; i++) {

//             year.push(response.data[i].year);
//             touristDeparture.push(response.data[i].touristDeparture*100); //Multiplico por factor de 100 para que los valores se vean mejor en la gráfica
//             publicSpending.push(0);

//         }


//         console.log(year);

    var apiPropia = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";
    var api08 = "https://sos1819-08.herokuapp.com/API/v1/tourists-by-countries";
        


    $http.get(apiPropia).then(function(response) {
        $http.get(apiPropia).then(function(response1) {
            var data = {
                // A labels array that can contain any sort of values
                labels: [response.data[0].year,
                        response.data[1].year,
                        response.data[2].year,
                        response.data[3].year,
                        response.data[4].year,
                        response.data[5].year],
                // Our series array that contains series objects or in this case series data arrays
                series: [
                    [response.data[0].publicSpending, response.data[1].publicSpending,
                    response.data[2].publicSpending, response.data[3].publicSpending,
                    response.data[4].publicSpending, response.data[5].publicSpending]
                    
                ,
                
                [response1.data[0].incomeTourist/100, response1.data[1].incomeTourist/100,
                     response1.data[2].incomeTourist/100, response1.data[3].incomeTourist/100,
                     response1.data[4].incomeTourist/100, response1.data[5].incomeTourist/100]    
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
