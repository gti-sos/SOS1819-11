var app = angular.module("App");

datos = []


app.controller("ApiSOS09", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
  
    var apiEXT = "/proxySOS09/api/v2/climate-stats"

    $http.get(apiEXT).then(function(response) {
        
        for (var i = 0; i < response.data.length-7; i++) {
            
            datos.push({ y: response.data[i].country + " " + response.data[i].year, a: response.data[i].methane_stats/10000, b: response.data[i].nitrous_oxide_stats/10000});
         
        }
        
        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
            for (var i = 0; i < response.data.length-16; i++) {
                
                datos.push({y: response.data[i].country + " " + response.data[i].year, a: response.data[i].educationExpensePub, b: response.data[i].educationExpensePib});
               
            }
        
        
         Morris.Bar({
          element: 'bar-example',
          data:datos,
          xkey: 'y',
          ykeys: ['a', 'b'],
          labels: ['Porcentaje A', 'Porcentaje B']
        });

    
    });

});


}]);
