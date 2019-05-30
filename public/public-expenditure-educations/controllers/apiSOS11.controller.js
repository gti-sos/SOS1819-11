var app = angular.module("App");

datos = []

var wdata =[]
app.controller("ApiSOS11", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
  

    $http.get("https://sos1819-11.herokuapp.com/api/v2/public-health-expenses").then(function(response) {
        
        for (var i = 0; i < response.data.length; i++) {
            
            wdata.push({ id:response.data[i].country, value:  response.data[i].healthExpense});

         
        }
        
        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                
                wdata.push({ id:response.data[i].country, value:  response.data[i].educationExpense});

            }
        
        console.log(wdata)
       
             
        var cdata = {
                "border-width":1,
                "border-color":"#000",
                "background-color":"#fff",
                "graphset":[
                    {
                        "title":{
                            "text":"Countries of the World"
                        },
                        "type":"sunburst",
                        "plotarea":{
                            "margin":'40 0 0 0'
                        },
                        "options":{
                        },
                        "tooltip":{
                            "align":"left",
                            "thousands-separator":","
                        },
                        "scale-r":{
                            "-ref-angle":180,
                            "-aperture":180
                        },
                        "plot":{
                            "tooltip-text":"<span style='font-size:19px'>%plot-text</span><br/>Expenses: %node-value",
                            "value-box":{
                                "visible":null,
                                "font-size":10,
                                "text":"%data-vbtext"
                            }
                        },
                        "series":wdata
                    }
                ]
            };
             
            zingchart.render({
              id : 'zc',
              width : 600,
            	height : 600,
            	output : 'svg',
            	data : cdata
            });

    
    });

});


}]);
