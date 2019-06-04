var app = angular.module("App");


app.controller("Api-sos10", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

var year = []
var dryNaturalGas = []
var publicSpending = []

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            
            publicSpending.push(response.data[i].publicSpending);

        }
        
        $http.get("https://sos1819-10.herokuapp.com/api/v2/biofuels-production").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            
            dryNaturalGas.push(response.data[i].dryNaturalGas*400); //Multiplico por factor de 100 para que los valores se vean mejor en la gráfica
            

        }


        console.log(year);

     $(document).ready(function(){
  var line1 = publicSpending;
  var line2 = dryNaturalGas;
  var plot4 = $.jqplot('chart4', [line1, line2], {
      title: 'Gasto público y gas natrual seco', 
      stackSeries: true, 
      seriesDefaults: {
          renderer: $.jqplot.BarRenderer,
          rendererOptions:{barMargin: 25}, 
          pointLabels:{show:true, stackedValue: true}
      },
      axes: {
          xaxis:{renderer:$.jqplot.CategoryAxisRenderer}
      }
  });
});   


        
        
    });
    
    });
}]);
