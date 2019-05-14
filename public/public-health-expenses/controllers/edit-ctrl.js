/* global angular */
var app = angular.module("App");

app.controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    console.log("EditCtrl initialized!");

    $scope.url = "/api/v2/public-health-expenses";

    var country = $routeParams.country;
    var year = parseInt($routeParams.year, 10);

    console.log("Requesting data with country: " + country + " and year: " + year);
    $http.get($scope.url + "/" + country + "/" + year).then(function(response) {
        console.log("State: " + response.status);
        console.log("Data: " + JSON.stringify(response.data, null, 2));
        document.getElementById("btnUpdate").disabled = false;
        $scope.data = response.data;
    }).catch(function(response) {
        console.log("State: " + response.status);
        console.log("Data: " + JSON.stringify(response.data, null, 2));
        document.getElementById("btnUpdate").disabled = true;
    });

    $scope.put = function() {
        var updatedData = {
            country: country,
            year: year,
            publicHealthExpense: Number.parseFloat($scope.data.publicHealthExpense),
            healthExpense: Number.parseFloat($scope.data.healthExpense),
            totalPublicExpense: Number.parseFloat($scope.data.totalPublicExpense),
            healthExpensePib: Number.parseFloat($scope.data.healthExpensePib),
            healthExpenditurePerCapita: Number.parseFloat($scope.data.healthExpenditurePerCapita),
            var_: Number.parseFloat($scope.data.var_)
        };
        $http.put($scope.url + "/" + country + "/" + year, updatedData).then(function(response) {
            console.log("PUT response: " + response.status + " " + response.data);
            $scope.response = "El dato se ha actualizado correctamente.";
            $location.path("/ui/v1/public-health-expenses");
        }).catch(function(response) {
            console.log("PUT response: " + response.status + " " + response.data);
            var state = response.status;
            if (state == 400) {
                $scope.response = "No se ha podido actualizar el dato: es necesario introducir todos los atributos.";
            }
            else if (state == 404) {
                $scope.response = "No se ha podido actualizar el dato: no existe un dato referente a ese país y año.";
            }
            else {
                $scope.response = "No se ha podido actualizar el dato: ha ocurrido un error interno en el servidor.";
            }
        });
    };

}]);
