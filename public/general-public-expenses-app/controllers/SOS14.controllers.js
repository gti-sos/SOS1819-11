var app = angular.module("App");


app.controller("Api-sos14", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var year = []
    var number = []
    var publicSpending = []

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            //year.push(response.data[i].year*10000);
            number.push(0);
            publicSpending.push(response.data[i].publicSpending);

        }

        $http.get("https://sos1819-14.herokuapp.com/api/v1/deceaseds").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {

                //year.push(response.data[i].year);
                number.push(response.data[i].number * 25000); //Multiplico por factor de 100 para que los valores se vean mejor en la gráfica
                publicSpending.push(0);

            }


            console.log(year);



$(document).ready(function(){
  var line1 = publicSpending;
  var line2 = number
  var plot1 = $.jqplot('chart1', [line1, line2], {
      title: 'Chart with Point Labels', 
      seriesDefaults: { 
        showMarker:true,
        pointLabels: { show:true } 
      }
  });
});

         });

     });
}]);
