var app = angular.module("App");

var country =[]
var educationExpensePib = []
var subsidyPercentage = []
app.controller("ApiSOS07", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    


    $http.get("https://sos1819-07.herokuapp.com/api/v2/subsidies-stats").then(function(response) {
        
        for (var i = 0; i < 3; i++) {
            
            country.push(response.data[i].country);
            
            educationExpensePib.push(0);
            subsidyPercentage.push(response.data[i].subsidyPercentage/10);
            
         
        }
        
        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
            
            for (var i = 0; i < 3; i++) {
                country.push(response.data[i].country);
                educationExpensePib.push(response.data[i].educationExpensePib);
                subsidyPercentage.push(0);
               
            }
            
         

            new RGraph.SVG.Bar({
                id: 'chart-container',
                data: educationExpensePib,
                options: {
                    yaxisScaleMax: 100,
                    marginInner: 15,
                    backgroundGridVlines: false,
                    backgroundGridBorder: false,
                    colors: ['Gradient(red:red:white)'],
                    shadow: true,
                    yaxis: false,
                    xaxis: false,
                    xaxisLabels: country
                }
            }).wave();
        
            new RGraph.SVG.Line({
                id: 'chart-container',
                data: subsidyPercentage,
                options: {
                    marginInner: 45,
                    colors: ['black'],
                    tickmarksStyle: 'endcircle',
                    tickmarksSize: 3,
                    backgroundGrid: false,
                    xaxis: false,
                    yaxis: false,
                    shadow: true
                }
            }).trace();
                    
        
                        
        });

    
    });

}]);    