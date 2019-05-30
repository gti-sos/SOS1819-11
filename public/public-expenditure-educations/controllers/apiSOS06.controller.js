var app = angular.module("App");

datos = []

var country =[]
var points =[]
var educationExpense =[]

app.controller("ApiSOS06", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
  
    var apiEXT = "/proxySOS06/api/v1/uefa-club-rankings"
    
    $http.get(apiEXT).then(function(response) {
        
        for (var i = 0; i < 5; i++) {
            
            country.push(response.data[i].country);
            points.push(response.data[i].points);
            educationExpense.push(0);

         
        }
        
        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
            for (var i = 0; i < 5; i++) {
                
               country.push(response.data[i].country);
               points.push(0);
               educationExpense.push(response.data[i].educationExpense);

            }
            
   
        
       var xValue = country;

        var yValue = points;
        var yValue2 = educationExpense;
        
        var trace1 = {
          x: xValue,
          y: yValue,
          type: 'bar',
          text: yValue,
          textposition: 'auto',
          hoverinfo: 'none',
          opacity: 0.5,
          marker: {
            color: 'rgb(158,202,225)',
            line: {
              color: 'rbg(8,48,107)',
              width: 1.5
            }
          }
        };
        
        var trace2 = {
          x: xValue,
          y: yValue2,
          type: 'bar',
          text: yValue2,
          textposition: 'auto',
          hoverinfo: 'none',
          marker: {
            color: 'rgba(58,200,225,.5)',
            line: {
              color: 'rbg(8,48,107)',
              width: 1.5
            }
          }
        };
        
        var data = [trace1,trace2];
        
        var layout = {
          title: 'uefa club rankings and public expenditure educations',
          barmode: 'stack'
        };
        
        Plotly.newPlot('myDiv', data, layout, {showSendToCloud:true});

    
    });

});


}]);
