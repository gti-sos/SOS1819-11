var app = angular.module("App");

var datos =[]
app.controller("ApiSOS02", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    


    $http.get("https://sos1819-02.herokuapp.com/api/v1/companies-stats").then(function(response) {
        
        for (var i = 0; i < response.data.length; i++) {
            
            datos.push({  x : response.data[i].marketcapitalization*1000 , y:response.data[i].income*1000 , z: response.data[i].year, name: response.data[i].country});
         
        }
        
        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
            
            for (var i = 0; i < response.data.length; i++) {
                datos.push({ x : response.data[i].educationExpense , y:response.data[i].educationExpense ,z:response.data[i].year , name: response.data[i].country});
               
            }
            
            console.log(datos)

            var chart = new CanvasJS.Chart("chartContainer", {
            	animationEnabled: true,
            	zoomEnabled: true,
            	theme: "light2",
            	title:{
            		text: "Capitalization And Education Expense"
            	},
            	axisX: {
            		title:"€",
            		suffix: "€",
            		minimum: 0,
            		maximum: 200000,
            		gridThickness: 1
            	},
            	axisY:{
            		title: "",
            		suffix: ""
            	},
            	data: [{
            		type: "bubble",
            		toolTipContent: "<b>{name}</b><br/>Expense: {x} m <br/> Income: {y} m. <br/> Year: {z}",
            		dataPoints: datos
            	}]
            });
            
            chart.render();
                    
        
                        
        });

    
    });

}]);    