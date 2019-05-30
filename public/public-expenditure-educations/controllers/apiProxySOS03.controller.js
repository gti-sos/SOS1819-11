/*global angular,app,request,Highcharts*/


var app = angular.module("App");

var datos =[]
app.controller("ApiProxySOS03", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    
    var apiEXT = "/proxySOS03/api/v1/computers-attacks-stats"
    


    $http.get(apiEXT).then(function(response) {
        
        for (var i = 0; i < response.data.length; i++) {
            
            datos.push({ country: response.data[i].country + " " + response.data[i].year, visits: response.data[i].economicimpactmillions*1000});
         
        }
        
        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                datos.push({country: response.data[i].country + " " + response.data[i].year, visits: response.data[i].educationExpense});
               
            }


        
        
            am4core.ready(function() {

                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end
                
                // Create chart instance
                var chart = am4core.create("chartdiv", am4charts.XYChart3D);
                
                // Add data
                chart.data = datos;
                
                // Create axes
                let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "country";
                categoryAxis.renderer.labels.template.rotation = 270;
                categoryAxis.renderer.labels.template.hideOversized = false;
                categoryAxis.renderer.minGridDistance = 20;
                categoryAxis.renderer.labels.template.horizontalCenter = "right";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                categoryAxis.tooltip.label.rotation = 270;
                categoryAxis.tooltip.label.horizontalCenter = "right";
                categoryAxis.tooltip.label.verticalCenter = "middle";
                
                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.title.text = "Millions";
                valueAxis.title.fontWeight = "bold";
                
                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries3D());
                series.dataFields.valueY = "visits";
                series.dataFields.categoryX = "country";
                series.name = "Visits";
                series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;
                
                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
                columnTemplate.stroke = am4core.color("#FFFFFF");
                
                columnTemplate.adapter.add("fill", (fill, target) => {
                  return chart.colors.getIndex(target.dataItem.index);
                })
                
                columnTemplate.adapter.add("stroke", (stroke, target) => {
                  return chart.colors.getIndex(target.dataItem.index);
                })
                
                chart.cursor = new am4charts.XYCursor();
                chart.cursor.lineX.strokeOpacity = 0;
                chart.cursor.lineY.strokeOpacity = 0;
                
            });
                        
        });

    
    });

}]);    