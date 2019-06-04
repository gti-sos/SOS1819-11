var app = angular.module("App");


app.controller("Api-sos09", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {


    var apiEXT = "/proxy1";
    var apiPropia = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";


    $http.get(apiPropia).then(function(response) {
        $http.get(apiEXT).then(function(response2) {
            
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Estadística de crecimiento por país'
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
                    name: 'Estadísticas de crecimiento',
                    colorByPoint: true,
                    data: [
                        [response.data[0].country, response2.data[0].gdp_growth_stats],
                        [response.data[1].country, response2.data[1].gdp_growth_stats],
                        [response.data[2].country, response2.data[2].gdp_growth_stats],
                        [response.data[3].country, response2.data[3].gdp_growth_stats],
                        [response.data[4].country, response2.data[4].gdp_growth_stats]
                    ]
                }]
            });
    
        });   
    });
        
        

    
 
    
}]);
