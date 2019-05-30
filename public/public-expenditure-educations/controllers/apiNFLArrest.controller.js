var app = angular.module("App");

names = []
arrest_count = []

app.controller("ApiNFLArrest", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
     var urlAPI = {
        method: 'GET',
        url: "https://nflarrest.com/api/v1/team/topPlayers/sea",
        headers: {
            "Accept": "application/json"
        }
    };


    $http(urlAPI).then(function(response) {
        
        
        
        for (var i = 0; i < response.data.length ; i++) {
            
            names.push(response.data[i].Name);
            arrest_count.push(response.data[i].arrest_count);

         
        }
        
   console.log(names)     
    new RGraph.Pie({
        id: 'cvs',
        data: arrest_count,
        options: {
            labels: names,
            textAccessibleOverflow: 'hidden'
        }
    }).grow();
       

    
    });

}]);    