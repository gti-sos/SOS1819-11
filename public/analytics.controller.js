var app = angular.module("App");


app.controller("AnalyticsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var country = [];
    var publicSpending = [];
    var educationExpense = [];
    var healthExpense = [];
    
   
    var country = [];
    var publicHealthExpense = [];
    var healthExpense = [];
    var totalPublicExpense = [];

    var country = [];
    var educationExpense = [];
    var educationExpensePub = [];
    var educationExpensePib = [];

    $http.get("api/v1/general-public-expenses").then(function(response) {
        console.log("Api general-public-expenses");
        for (var i = 0; i < response.data.length ; i++) {
            country.push(response.data[i].country + " " + response.data[i].year);
            publicSpending.push(response.data[i].publicSpending);
            educationExpense.push(response.data[i].educationExpense);
            healthExpense.push(response.data[i].healthExpense);
            
        }
    });
    $http.get("api/v2/public-health-expenses").then(function(response) {
        console.log("Api public-health-expense");
        for (var i = 0; i < response.data.length; i++) {
            country.push(response.data[i].country + " " + response.data[i].year);
            publicHealthExpense.push(response.data[i].publicHealthExpense);
            healthExpense.push(response.data[i].healthExpense);
            totalPublicExpense.push(response.data[i].totalPublicExpense);
        }
    });

    $http.get("api/v2/public-expenditure-educations").then(function(response) {
        console.log("Api public-expenditure-educations");
     for (var i = 0; i < response.data.length; i++) {
            country.push(response.data[i].country + " " + response.data[i].year);
            educationExpense.push(response.data[i].educationExpense);
            educationExpensePub.push(response.data[i].educationExpensePub);
            educationExpensePib.push(response.data[i].educationExpensePib);
        }
      console.log(country)
        Highcharts.chart('container', {
            chart: {
                type: 'area',
                spacingBottom: 30
            },
            title: {
                text: 'GLOBAL'
            },
           
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories:country},
            yAxis: {
                title: {
                    text: 'Y-Axis'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Public Spending',
                data: publicSpending
            },{
                name: 'Education Expense',
                data: educationExpense
            },{
                name: 'Health Expense',
                data: healthExpense
            }, 
            {
                name: 'Public Health Expense',
                data: publicHealthExpense
            },{
                name: 'Health Expense',
                data: healthExpense
            },{
                name: 'Total Public Expense',
                data: totalPublicExpense
            },{
                name: 'Education Expense',
                data: educationExpense
            },
            
            {
                name: 'Education ExpensePub',
                data: educationExpensePub
            },{
                name: 'Education ExpensePib',
                data: educationExpensePib
            }]
        });
    });
}]);