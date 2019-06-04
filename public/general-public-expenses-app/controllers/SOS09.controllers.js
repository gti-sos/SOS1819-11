var app = angular.module("App");


app.controller("Api-sos09", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {


    var apiEXT = "/proxy09/api/v1/economy-stats"
    


    $http.get(apiEXT).then(function(response) {
        $scope.getLista = response.data  

    
    });
    
}]);
