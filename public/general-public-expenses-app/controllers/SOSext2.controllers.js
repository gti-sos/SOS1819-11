var app = angular.module("App");


app.controller("Api-sos-ext2", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
      
   var apiPropia = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";
   //var apiExt2 = "https://www.songsterr.com/a/ra/songs.js?pattern=Marley";
     
   
   $http.get(apiPropia).then(function(response) {
   //$http.get(apiExt2).then(function(response2) {
   
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
                                text: 'Integración Grupal'
                            },
    
                            xAxis: {
                                gridLineWidth: 1,
                                title: {
                                    text: 'income'
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
                                    text: 'movieedition'
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
                                    '<tr><th>income:</th><td>{point.x}</td></tr>' +
                                    '<tr><th>movieedition:</th><td>{point.y}</td></tr>' +
                                    '<tr><th>scoreraverage:</th><td>{point.z}%</td></tr>',
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
                                    { x: response.data[0].publicSpending, y: response.data[0].healthExpense, z: response.data[0].healthExpense, country: response.data[0].country},
                                    { x: response.data[1].publicSpending, y: response.data[1].healthExpense, z: response.data[1].healthExpense, country: response.data[1].country},
                                    { x: response.data[2].publicSpending, y: response.data[2].healthExpense, z: response.data[2].healthExpense, country: response.data[2].country},
                                    { x: response.data[3].publicSpending, y: response.data[3].healthExpense, z: response.data[3].healthExpense, country: response.data[3].country},
                                    { x: response.data[4].publicSpending, y: response.data[4].healthExpense, z: response.data[4].healthExpense, country: response.data[4].country}
                                ]
            }]
       });  
       
       
   // });
    
        }); 
     
    
    
    
    
           
    
    
}]);