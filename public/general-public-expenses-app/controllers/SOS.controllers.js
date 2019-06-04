var app = angular.module("App");


app.controller("Api-sos", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    // var google_array = [['Pais','Public Spending']]

    // var year = ['year']
    // var publicSpending = ['publicSpending']
    // var educationExpense = ['educationExpense']
    // var healthExpense = ['healthExpense']
    // var defenseSpending = ['defenseSpending']
    // var publicSpendingPib = ['publicSpendingPib']
    // var var_ = ['var_']
    
    var apiPropia = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";

    // $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

    //     for (var i = 0; i < response.data.length; i++) {

    //         google_array.push([response.data[i].country, response.data[i].publicSpending]);
            
    //         year.push(response.data[i].year)
    //         publicSpending.push(response.data[i].publicSpending)
    //         educationExpense.push(response.data[i].educationExpense)
    //         healthExpense.push(response.data[i].healthExpense)
    //         defenseSpending.push(response.data[i].defenseSpending)
    //         publicSpendingPib.push(response.data[i].publicSpendingPib)
    //         var_.push(response.data[i].var_)
            

    //     }
     
    // console.log(google_array);
    
    //HIGHTCHART
    
    $http.get(apiPropia).then(function(response) {

            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Gasto Público en países'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Gasto público',
                    colorByPoint: true,
                    data: [
                        [response.data[0].country, response.data[0].publicSpending],
                        [response.data[1].country, response.data[1].publicSpending],
                        [response.data[2].country, response.data[2].publicSpending],
                        [response.data[3].country, response.data[3].publicSpending],
                        [response.data[4].country, response.data[4].publicSpending]
                    ]
                }]
            });
});

//GOOGLE
    
    $http.get(apiPropia).then(function(response){
        google.charts.load('current', {
            'packages':['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyDUY_cjdk5nidSF_6m_OoLYQ0ROcuzzayc'
          });
          google.charts.setOnLoadCallback(drawRegionsMap);
    
          function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Country', 'publicSpending'],
                [response.data[0].country, response.data[0].publicSpending],
                [response.data[1].country, response.data[1].publicSpending],
                [response.data[2].country, response.data[2].publicSpending],
                [response.data[3].country, response.data[3].publicSpending],
                [response.data[4].country, response.data[4].publicSpending],
                [response.data[5].country, response.data[5].publicSpending],
                [response.data[6].country, response.data[6].publicSpending],
                [response.data[7].country, response.data[7].publicSpending],
                [response.data[8].country, response.data[8].publicSpending],
                [response.data[9].country, response.data[9].publicSpending],
                [response.data[10].country, response.data[10].publicSpending]
            ]);
    
            var options = {}
    
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
            chart.draw(data, options);
          }
    });
      
      //C3.js
      
    $http.get(apiPropia).then(function(response){
        var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            [response.data[0].country, response.data[0].year, response.data[0].publicSpending, response.data[0].educationExpense, response.data[0].healthExpense, 
            response.data[0].defenseSpending, response.data[0].publicSpendingPib, response.data[0].var_],
            [response.data[1].country, response.data[1].year, response.data[1].publicSpending, response.data[1].educationExpense, response.data[1].healthExpense, 
            response.data[1].defenseSpending, response.data[1].publicSpendingPib, response.data[1].var_],
            [response.data[2].country, response.data[2].year, response.data[2].publicSpending, response.data[2].educationExpense, response.data[2].healthExpense, 
            response.data[2].defenseSpending, response.data[2].publicSpendingPib, response.data[2].var_],
            [response.data[3].country, response.data[3].year, response.data[3].publicSpending, response.data[3].educationExpense, response.data[3].healthExpense, 
            response.data[3].defenseSpending, response.data[3].publicSpendingPib, response.data[3].var_],
            [response.data[4].country, response.data[4].year, response.data[4].publicSpending, response.data[4].educationExpense, response.data[4].healthExpense, 
            response.data[4].defenseSpending, response.data[4].publicSpendingPib, response.data[4].var_],
            [response.data[5].country, response.data[5].year, response.data[5].publicSpending, response.data[5].educationExpense, response.data[5].healthExpense, 
            response.data[5].defenseSpending, response.data[5].publicSpendingPib, response.data[5].var_],
            [response.data[6].country, response.data[6].year, response.data[6].publicSpending, response.data[6].educationExpense, response.data[6].healthExpense, 
            response.data[6].defenseSpending, response.data[6].publicSpendingPib, response.data[6].var_]
            ]
            }
        });
    
    });

    
    
}]);
