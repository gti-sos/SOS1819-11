var app = angular.module("App");


app.controller("Api-sos-ext2", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
      
   var apiPropia = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";
   var apiExt2 = "/proxyExterno";
     
   
   $http.get(apiPropia).then(function(response) {
   $http.get(apiExt2).then(function(response2) {
   
       Highcharts.chart('container', {
    
                            chart: {
                                type: 'area',
                                plotBorderWidth: 1,
                                zoomType: 'xy'
                            },
    
                            legend: {
                                enabled: false
                            },
    
                            title: {
                                text: 'Integración Api Externa2'
                            },
    
                            xAxis: {
                                gridLineWidth: 1,
                                title: {
                                    text: 'Gasto Público'
                                },
                                labels: {
                                    format: '{value}'
                                },
                                plotLines: [{
                                    color: 'black',
                                    dashStyle: 'dot',
                                    width: 2,
                                    value: 65,
                                    label: {
                                        rotation: 0,
                                        y: 15,
                                        style: {
                                            fontStyle: 'italic'
                                        },
                                    },
                                    zIndex: 3
                                }]
                            },
    
                            yAxis: {
                                startOnTick: false,
                                endOnTick: false,
                                title: {
                                    text: 'Código'
                                },
                                labels: {
                                    format: '{value}'
                                },
                                maxPadding: 0.2,
                                plotLines: [{
                                    color: 'black',
                                    dashStyle: 'yellow',
                                    width: 2,
                                    value: 50,
                                    label: {
                                        align: 'right',
                                        style: {
                                            fontStyle: 'italic'
                                        },
                                        
                                    },
                                    zIndex: 3
                                }]
                            },
    
                            tooltip: {
                                useHTML: true,
                                headerFormat: '<table>',
                                pointFormat: '<tr><th colspan="2"><h3>{point.comany}</h3></th></tr>' +
                                    '<tr><th>Gastos Públicos:</th><td>{point.x}</td></tr>' +
                                    '<tr><th>Código:</th><td>{point.y}</td></tr>' +
                                    '<tr><th>Gastos Salud:</th><td>{point.z}%</td></tr>',
                                footerFormat: '</table>',
                                followPointer: true
                            },
    
                            plotOptions: {
                                series: {
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.company}'
                                    }
                                }
                            },
    
                            series: [{
                                data: [
                                    { x: response.data[0].publicSpending, y: parseInt(response2.data[0].codigo,10), z: response.data[0].healthExpense, country: response.data[0].country},
                                    { x: response.data[1].publicSpending, y: parseInt(response2.data[1].codigo,10), z: response.data[1].healthExpense, country: response.data[1].country},
                                    { x: response.data[2].publicSpending, y: parseInt(response2.data[2].codigo,10), z: response.data[2].healthExpense, country: response.data[2].country},
                                    { x: response.data[3].publicSpending, y: parseInt(response2.data[3].codigo,10), z: response.data[3].healthExpense, country: response.data[3].country},
                                    { x: response.data[4].publicSpending, y: parseInt(response2.data[4].codigo,10), z: response.data[4].healthExpense, country: response.data[4].country}
                                ]
            }]
       });  
       
       
    });
    
        }); 
    
    
    
}]);