/* global angular Taucharts */
var app = angular.module("App");

var defData = [];

app.controller("apiSOS-G04", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-G04 initialized!");

    var remoteAPI = "/proxySOS-G04";

    $http.get(remoteAPI + "/api/v1/happiness-stats/").then(function(response) {

        for (var i = 0; i < response.data.length; i++) {
            if (i == 0) {
                defData.push({ team: 'Alpha', date: 10, effort: response.data[i].happinessScore });
            }
            else {
                defData.push({ team: 'Alpha', date: i * 10 + 10, effort: response.data[i].happinessScore });
            }
        }

        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                if (i == 0) {
                    defData.push({ team: 'Beta', date: 10, effort: response.data[i].healthExpensePib });
                }
                else {
                    defData.push({ team: 'Beta', date: i * 10 + 10, effort: response.data[i].healthExpensePib });
                }
            }

            console.log(defData);

            new Taucharts.Chart({
                type: 'stacked-area',
                x: 'date',
                y: 'effort',
                color: 'team',
                data: defData
            }).renderTo('#target');

            // new Taucharts.Chart({
            //     type: 'stacked-area',
            //     x: 'date',
            //     y: 'effort',
            //     color: 'team',
            //     data: [
            //         { team: 'Alpha', date: '2015-07-15', effort: 400 },
            //         { team: 'Alpha', date: '2015-07-16', effort: 200 },
            //         { team: 'Alpha', date: '2015-07-17', effort: 300 },
            //         { team: 'Alpha', date: '2015-07-18', effort: 500 },
            //         { team: 'Beta', date: '2015-07-15', effort: 100 },
            //         { team: 'Beta', date: '2015-07-16', effort: 200 },
            //         { team: 'Beta', date: '2015-07-17', effort: 300 },
            //         { team: 'Beta', date: '2015-07-18', effort: 100 },
            //         { team: 'Gamma', date: '2015-07-15', effort: 300 },
            //         { team: 'Gamma', date: '2015-07-16', effort: 100 },
            //         { team: 'Gamma', date: '2015-07-17', effort: 100 },
            //         { team: 'Gamma', date: '2015-07-18', effort: 200 }
            //     ]
            // }).renderTo('#target');

        });

    });

}]);
