var app = angular.module("App");

datos = []


app.controller("ApiEarthguakeIceland", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
     var urlAPI = {
        method: 'GET',
        url: "https://apis.is/earthquake/is",
        headers: {
            "Accept": "application/json"
        }
    };


    $http(urlAPI).then(function(response) {
        
        
        console.log(response.data.results.length)
        for (var i = 0; i < response.data.results.length -35; i++) {
            
                console.log(i)
                datos.push({time:response.data.results[i].timestamp, quality:response.data.results[i].quality});
         
        }
        
        
        new Morris.Line({
          // ID of the element in which to draw the chart.
          element: 'myfirstchart',
          // Chart data records -- each entry in this array corresponds to a point on
          // the chart.
          data: datos,
          // The name of the data record attribute that contains x-values.
          xkey: 'time',
          // A list of names of data record attributes that contain y-values.
          ykeys: ['quality'],
          // Labels for the ykeys -- will be displayed when you hover over the
          // chart.
          labels: ['quality']
        });

    
    });

}]); 