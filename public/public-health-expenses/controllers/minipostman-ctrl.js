/* global angular */
var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("MainCtrl initialized!");

    $scope.url = "/api/v2/public-health-expenses";

    // Paginación
    var offset;
    var limit = 10;
    var pagination;
    var totalData;

    /*
    // Cargar los datos
    refresh(null);

    function refresh(parameter) {

        if (parameter == true) {
            offset = offset + limit;
        }
        else if (parameter == false) {
            offset = offset - limit;
        }
        else {
            offset = 0;
        }

        pagination = "/?offset=" + offset + "&limit=" + limit;
        console.log("Requesting data to <" + $scope.url + ">...");
        $http.get($scope.url + pagination).then(function(response) {
            console.log("State: " + response.status);
            console.log("Data: " + JSON.stringify(response.data, null, 2));
            totalData = response.data.length;
            console.log("Número de objetos devueltos <" + totalData + ">");
            console.log("Paginación <" + pagination + ">");

            if (offset == 0) {
                // Deshabilitar el botón 'Anterior'
                document.getElementById("btnPrevious").disabled = true;
                if (totalData < limit) {
                    // Deshabilitar el botón 'Siguiente'
                    document.getElementById("btnNext").disabled = true;
                }
                else {
                    // Habilitar el botón 'Siguiente'
                    document.getElementById("btnNext").disabled = false;
                }
            }
            else if (totalData < limit) {
                // Habilitar el botón 'Anterior'
                document.getElementById("btnPrevious").disabled = false;
                // Deshabilitar el botón 'Siguiente'
                document.getElementById("btnNext").disabled = true;
            }
            else {
                // Habilitar el botón 'Anterior'
                document.getElementById("btnPrevious").disabled = false;
                // Habilitar el botón 'Siguiente'
                document.getElementById("btnNext").disabled = false;
            }

            $scope.getData = response.data;
        }).catch(function(response) {
            console.log("State: " + response.status);
            console.log("Data: " + JSON.stringify(response.data, null, 2));
        });
    }

    $scope.refresh = function(parameter) {
        refresh(parameter);
    };
    */

    getQuery(null);

    // $scope.get = function() {
    function getQuery(parameter) {
        var url;
        var country = document.getElementById("searchCountry").value;
        var from = document.getElementById("searchFrom").value;
        var to = document.getElementById("searchTo").value;
        console.log("Country: " + country);
        console.log("From: " + from);
        console.log("To: " + to);

        if (country == "" && from == "" && to == "") {
            url = "";
        }
        else if (country == "" && from == "") {
            // /?to=2017
            url = "/?to=" + to;
        }
        else if (country == "" && to == "") {
            // /?from=2017
            url = "/?from=" + from;
        }
        else if (from == "" && to == "") {
            // /?country=spain
            url = "/?country=" + country;
        }
        else if (country == "") {
            // /?from=2017&to=2017
            url = "/?from=" + from + "&to=" + to;
        }
        else if (from == "") {
            // /?country=spain&to=2017
            url = "/?country=" + country + "&to=" + to;
        }
        else if (to == "") {
            // /?country=spain&from=2017
            url = "/?country=" + country + "&from=" + from;
        }
        else {
            // /?country=spain&from=2017&to=2017
            url = "/?country=" + country + "&from=" + from + "&to=" + to;
        }
        /***************************/
        if (parameter == true) {
            offset = offset + limit;
        }
        else if (parameter == false) {
            offset = offset - limit;
        }
        else {
            offset = 0;
        }

        if (url == "") {
            pagination = "/?offset=" + offset + "&limit=" + limit;
        }
        else {
            pagination = "&offset=" + offset + "&limit=" + limit;
        }
        url = url + pagination;
        /***************************/
        console.log("URL: " + url);
        console.log("Requesting data to <" + $scope.url + url + ">...");
        $http.get($scope.url + url).then(function(response) {
            $scope.response = "Consulta realizada satisfactoriamente.";
            /*********************************/
            totalData = response.data.length;
            console.log("Número de objetos devueltos <" + totalData + ">");
            console.log("Paginación <" + pagination + ">");

            if (offset == 0) {
                // Deshabilitar el botón 'Anterior'
                document.getElementById("btnPrevious").disabled = true;
                if (totalData < limit) {
                    // Deshabilitar el botón 'Siguiente'
                    document.getElementById("btnNext").disabled = true;
                }
                else {
                    // Habilitar el botón 'Siguiente'
                    document.getElementById("btnNext").disabled = false;
                }
            }
            else if (totalData < limit) {
                // Habilitar el botón 'Anterior'
                document.getElementById("btnPrevious").disabled = false;
                // Deshabilitar el botón 'Siguiente'
                document.getElementById("btnNext").disabled = true;
            }
            else {
                // Habilitar el botón 'Anterior'
                document.getElementById("btnPrevious").disabled = false;
                // Habilitar el botón 'Siguiente'
                document.getElementById("btnNext").disabled = false;
            }
            /*********************************/
            $scope.getData = response.data;
        }).catch(function(response) {
            console.log("GET response: " + response.status);
            console.log("Data: " + JSON.stringify(response.data, null, 2));
            var state = response.status;
            if (state == 404) {
                $scope.response = "No se ha podido obtener el dato: no existe un dato referente a ese país y/o años.";
            }
            else {
                $scope.response = "No se ha podido obtener el dato: ha ocurrido un error interno en el servidor.";
            }
        });
    }

    /***************************/
    $scope.get = function(parameter) {
        getQuery(parameter);
    };
    /***************************/

    $scope.delete = function(country, year) {
        var url;
        if (country == null && year == null) {
            url = "";
            console.log("Deleting all data...");
        }
        else if (country == null) {
            url = "/" + year;
            console.log("Deleting data of <" + year + ">");
        }
        else if (year == null) {
            url = "/" + country;
            console.log("Deleting data <" + country + ">");
        }
        else {
            url = "/" + country + "/" + year;
            console.log("Deleting data <" + country + "> of <" + year + ">");
        }
        $http.delete($scope.url + url).then(function(response) {
            console.log("DELETE response: " + response.status + " " + response.data);
            $scope.response = "Se ha eliminado el dato correctamente.";
            // refresh(null);
            getQuery(null);
        }).catch(function(response) {
            console.log("DELETE response: " + response.status + " " + response.data);
            $scope.response = "No se ha podido borrar el dato: ha ocurrido un error interno en el servidor.";
        });
    };

    $scope.post = function() {
        var newData = $scope.newData;
        // var newData = {
        //     country: $scope.newData.country,
        //     year: Number.parseFloat($scope.newData.year),
        //     publicHealthExpense: Number.parseFloat($scope.newData.publicHealthExpense),
        //     healthExpense: Number.parseFloat($scope.newData.healthExpense),
        //     totalPublicExpense: Number.parseFloat($scope.newData.totalPublicExpense),
        //     healthExpensePib: Number.parseFloat($scope.newData.healthExpensePib),
        //     healthExpenditurePerCapita: Number.parseFloat($scope.newData.healthExpenditurePerCapita),
        //     var_: Number.parseFloat($scope.newData.var_)
        // };
        console.log("Adding new data: " + JSON.stringify(newData, null, 2));
        $http.post($scope.url, newData).then(function(response) {
            console.log("POST response: " + response.status + " " + response.data);
            $scope.response = "El dato se ha añadido correctamente.";
            // refresh(null);
            getQuery(null);
        }).catch(function(response) {
            console.log("POST response: " + response.status + " " + response.data);
            var state = response.status;
            if (state == 400) {
                $scope.response = "No se ha podido añadir el dato: es necesario introducir todos los atributos.";
            }
            else if (state == 409) {
                $scope.response = "No se ha podido añadir el dato: ya existe un dato referente al mismo país y año.";
            }
            else {
                $scope.response = "No se ha podido añadir el dato: ha ocurrido un error interno en el servidor.";
            }
        });
    };

    $scope.put = function() {
        var country = $scope.newData.country;
        var year = parseInt($scope.newData.year, 10);
        var updatedData = {
            country: country,
            year: year,
            publicHealthExpense: Number.parseFloat($scope.newData.publicHealthExpense),
            healthExpense: Number.parseFloat($scope.newData.healthExpense),
            totalPublicExpense: Number.parseFloat($scope.newData.totalPublicExpense),
            healthExpensePib: Number.parseFloat($scope.newData.healthExpensePib),
            healthExpenditurePerCapita: Number.parseFloat($scope.newData.healthExpenditurePerCapita),
            var_: Number.parseFloat($scope.newData.var_)
        };
        $http.put($scope.url + "/" + country + "/" + year, updatedData).then(function(response) {
            console.log("PUT response: " + response.status + " " + response.data);
            $scope.response = "El dato se ha actualizado correctamente.";
            // refresh(null);
            getQuery(null);
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
