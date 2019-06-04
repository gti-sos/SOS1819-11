var app = angular.module("App");

var datos =[]
app.controller("ApiSOS04", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    


    $http.get("https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats").then(function(response) {
        
        for (var i = 0; i < response.data.length; i++) {
            
            datos.push({ y: response.data[i].rating, label:  response.data[i].country });
         
        }
        
        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
            
            for (var i = 0; i < response.data.length -14; i++) {
                datos.push({ y :response.data[i].educationExpensePub ,label : response.data[i].country });
               
            }
            


            var chart = new CanvasJS.Chart("chartContainer", {
            	animationEnabled: true,
            	exportEnabled: true,
            	theme: "light1",
            	title:{
            		text: "beer-consumed and Education Expense Pub"
            	},
            	data: [{
            		type: "pyramid",
            		yValueFormatString: "#\"%\"",
            		indexLabelFontColor: "black",
            		indexLabelFontSize: 16,
            		indexLabel: "{label} - {y}",
            		//reversed: true, // Reverses the pyramid
            		dataPoints: datos
            	}]
            });
            chart.render();
                    
        
                        
        });

    
    });

}]);    