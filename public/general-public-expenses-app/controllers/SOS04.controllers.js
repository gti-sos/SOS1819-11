var app = angular.module("App");


app.controller("Api-sos04", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var year = []
    var noSuicidesMan = ['noSuicidesMan']
    var educationExpense = ['educationExpense']

    $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

        for (var i = 0; i < 10; i++) {

            
            educationExpense.push(response.data[i].educationExpense);

        }

        $http.get("https://sos1819-04.herokuapp.com/api/v1/suicide-rates").then(function(response) {

            for (var i = 0; i < 10; i++) {

                
                noSuicidesMan.push(response.data[i].noSuicidesMan); 
                

            }


            console.log(year);

            
            
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
