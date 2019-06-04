/* global angular Chart */

var app = angular.module("App");

var license_title = [];
var num_tags = [];

app.controller("apiSOS-ext2", ["$scope", "$http", function($scope, $http) {

    console.log("apiSOS-ext2 initialized!");

    var urlAPI = {
        method: 'GET',
        url: "/proxyExterno/api/3/action/package_search?fq=tags:economy",
        headers: {
            "Accept": "application/json"
        }
    };

    $http(urlAPI).then(function(response) {

        for (var i = 0; i < response.data.result.results.length; i++) {
            license_title.push(response.data.result.results[i].license_title);
            num_tags.push(response.data.result.results[i].num_tags);
        }

        console.log(license_title);
        console.log(num_tags);

        var marksCanvas = document.getElementById("marksChart");

        var marksData = {
            // labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
            labels: license_title,
            // datasets: [{
            //     label: "Student A",
            //     backgroundColor: "rgba(200,0,0,0.2)",
            //     data: [65, 75, 70, 80, 60, 80]
            // }, {
            //     label: "Student B",
            //     backgroundColor: "rgba(0,0,200,0.2)",
            //     data: [54, 65, 60, 70, 70, 75]
            // }]
            datasets: [{
                label: "Tags of license",
                backgroundColor: "rgba(200,0,0,0.2)",
                data: num_tags
            }]
        };

        var radarChart = new Chart(marksCanvas, {
            type: 'radar',
            data: marksData
        });

    });

}]);
