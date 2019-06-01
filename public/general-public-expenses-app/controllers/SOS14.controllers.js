var app = angular.module("App");


app.controller("Api-sos14", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var year = []
    var number = []
    var publicSpending = []

    // $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {

    //     for (var i = 0; i < response.data.length; i++) {

    //         year.push(response.data[i].year);
    //         number.push(0);
    //         publicSpending.push(response.data[i].publicSpending);

    //     }

    //     $http.get("https://sos1819-14.herokuapp.com/api/v1/deceaseds").then(function(response) {

    //         for (var i = 0; i < response.data.length; i++) {

    //             year.push(response.data[i].year);
    //             number.push(response.data[i].number * 1000); //Multiplico por factor de 100 para que los valores se vean mejor en la gráfica
    //             publicSpending.push(0);

    //         }


            console.log(year);

      anychart.onDocumentLoad(function () {
    // create an instance of a pie chart
    var chart = anychart.pie();
    // set the data
    chart.data([
      ["Chocolate", 5],
      ["Rhubarb compote", 2],
      ["Crêpe Suzette", 2],
      ["American blueberry", 2],
      ["Buttermilk", 1]
    ]);
    // set chart title
    chart.title("Top 5 pancake fillings");
    // set the container element 
    chart.container("container");
    // initiate chart display
    chart.draw();
  });


    //     });

    // });
}]);
