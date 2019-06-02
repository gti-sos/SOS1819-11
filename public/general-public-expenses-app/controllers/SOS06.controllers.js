var app = angular.module("App");


app.controller("Api-sos06", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

var year = []
var moneyspent = []
var publicSpending = []

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            //year.push(response.data[i].year);
            moneyspent.push(0);
            publicSpending.push(response.data[i].publicSpending/1000);

        }
        
        $http.get("https://sos1819-06.herokuapp.com/api/v1/transfer-stats/").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            //year.push(response.data[i].year);
            moneyspent.push(response.data[i].moneyspent*1); //Multiplico por factor de 100 para que los valores se vean mejor en la gráfica
            publicSpending.push(0);

        }


        console.log(year);

        

  ///var data = [30, 86, 168, 281, 303, 365];
  //var data1 = [60, 26, 18, 281, 303, 365];
  var concat = publicSpending.concat(moneyspent);

d3.select(".chart")
  .selectAll("div")
  .data(concat)
    .enter()
    .append("div")
    .style("width", function(d) { return d + "px"; })
    .text(function(d) { return d; });

        
    });
    
    });
}]);
