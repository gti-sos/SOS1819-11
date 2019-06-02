var app = angular.module("App");


app.controller("Api-sos04", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var year = []
    var noSuicidesMan = ['noSuicidesMan']
    var educationExpense = ['educationExpense']

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < 10; i++) {

            //year.push(response.data[i].year);
            noSuicidesMan.push(0);
            educationExpense.push(response.data[i].educationExpense);

        }

        $http.get("https://sos1819-04.herokuapp.com/api/v1/suicide-rates").then(function(response) {

            for (var i = 0; i < 10; i++) {

                //year.push(response.data[i].year);
                noSuicidesMan.push(response.data[i].noSuicidesMan); //Multiplico por factor de 100 para que los valores se vean mejor en la gráfica
                educationExpense.push(0);

            }


            console.log(year);


            // var chart = c3.generate({
            //     bindto: '#chart',
            //     data: {
            //         columns: [
            //             noSuicidesMan,
            //             educationExpense
            //         ],
            //         axes: {
            //             data2: 'y2'
            //         },
            //         types: {
            //             data2: 'bar'
            //         }
            //     },
            //     axis: {
            //         y: {
            //             label: {
            //                 text: 'Y Label',
            //                 position: 'outer-middle'
            //             },
            //             tick: {
            //                 format: d3.format("$,") // ADD
            //             }
            //         },
            //         y2: {
            //             show: true,
            //             label: {
            //                 text: 'Y2 Label',
            //                 position: 'outer-middle'
            //             }
            //         }
            //     }
            // });
            
            
    var chart = c3.generate({
    data: {
        columns: [
            noSuicidesMan,
            educationExpense
        ],
        types: {
            noSuicidesMan: 'area-spline',
            educationExpense: 'area-spline'
            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
        },
        groups: [['noSuicidesMan', 'educationExpense']]
    }
})




        });

    });
}]);
