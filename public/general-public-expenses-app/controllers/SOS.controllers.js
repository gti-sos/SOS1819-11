var app = angular.module("App");


app.controller("Api-sos", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var google_array = [['Pais','Public Spending']]

    var year = ['year']
    var publicSpending = ['publicSpending']
    var educationExpense = ['educationExpense']
    var healthExpense = ['healthExpense']
    var defenseSpending = ['defenseSpending']
    var publicSpendingPib = ['publicSpendingPib']
    var var_ = ['var_']

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            google_array.push([response.data[i].country, response.data[i].publicSpending]);
            
            year.push(response.data[i].year)
            publicSpending.push(response.data[i].publicSpending)
            educationExpense.push(response.data[i].educationExpense*10000)
            healthExpense.push(response.data[i].healthExpense*10000)
            defenseSpending.push(response.data[i].defenseSpending*10000)
            publicSpendingPib.push(response.data[i].publicSpendingPib*10000)
            var_.push(response.data[i].var_*10000)
            

        }
     
    console.log(google_array);
    

    google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyDUY_cjdk5nidSF_6m_OoLYQ0ROcuzzayc'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(
            google_array);

        var options = {}

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
      
      
      //C3.js
          var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            year,
            publicSpending,
            educationExpense,
            healthExpense,
            defenseSpending,
            publicSpendingPib,
            var_
          ]
        }
    });


   

     });
}]);
