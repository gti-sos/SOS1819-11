var app = angular.module("App");


app.controller("Api-sos11", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

var year = []
var educationExpense = []
var educationExpense2 = []

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < 10; i++) {

            year.push(response.data[i].year);
            //gdp_growth_stats.push(0);
            educationExpense.push(response.data[i].educationExpense*1000);

        }

        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {

            for (var i = 0; i < 10; i++) {

                year.push(response.data[i].year);
                educationExpense2.push(response.data[i].educationExpense*10); //Multiplico por factor de 100 para que los valores se vean mejor en la gráfica
                //publicSpending.push(0);

            }


            console.log(year);





            new Chartist.Bar('.ct-chart', {
                labels: year,
                series: [
                    educationExpense,
                    educationExpense2
                ]
            }, {
                stackBars: true,
                axisY: {
                    labelInterpolationFnc: function(value) {
                        return (value / 1000) + 'k';
                    }
                }
            }).on('draw', function(data) {
                if (data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 30px', 
                    });
                }
            });

         });

     });
}]);
