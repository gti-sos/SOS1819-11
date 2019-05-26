/*global angular,Highcharts,google*/

var app = angular.module("App");

app.controller("EducationsViews", ["$scope", "$http", "$httpParamSerializer", function($scope, $http,  $httpParamSerializer) {
    var BASE_PATH_API = "/api/v2/public-expenditure-educations"

    $http.get(BASE_PATH_API).then(function(response) {
        
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Total Public-Expenditure-Educations'
            },

            xAxis: {
                categories: response.data.map(function(r) { return (r.country + " " + r.year) }),
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Education Expense'
                },
                
                labels: {
                    formatter: function () {
                        return this.value / 100;
                    }
                }       

            },
            tooltip: {
                split: true,
                valueSuffix: ' millions'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },

            series: [{
                name: 'Education Expense',
                data: response.data.map(function(r) { return (parseFloat(r.educationExpense)) })
            }]
        });
        
        
         // ----------------------------------------------- Google Geochart----------------------------------
   
            
            

            google.charts.load('current', {
                'packages': ['geochart'],
                
             
    
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
            
            //>>>>>>>>>>>>>>>>>> Datos 2015 country 
            
            var educationExpense = [];
            var country = response.data.filter(r=>r.year==2015).map(function(d){return (String(d.country))})
            
            for(var i= 0; i < country.length; i++){
                
                
                
                if ( country[i]){
                    educationExpense[i] = parseFloat(response.data.filter(r=>r.year==2015 && r.country == country[i]).map(function(d){return (parseFloat(d.educationExpense))}))
                    
                  
                }
    
            }
            var datos = [['country','Education Expense in 2015']] // Gasto en educion y pais
            
            for(var i= 0; i < educationExpense.length; i++){
                
                var dato = []
                
                dato[0] = country[i]
                dato[1] = educationExpense[i]
                
                datos[i + 1] = dato
                
            }
            
            console.log(datos)
    
            function drawRegionsMap() {
                console.log("----_-> Datos")
                var data = google.visualization.arrayToDataTable(datos);
    
                var options = {};
    
                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
                chart.draw(data, options);
            }
        
    
     // ----------------------------------------------- ZingChart----------------------------------

        
        var myConfig = {
          type: "hbar",
          title: {
            align: "center",
            text: "Var., Education Expense Pub and Education Expense Pib for country in years",
            fontColor: "#555",
            fontSize: 30,
            fontFamily: "Roboto",
            fontWeight: 'normal',
            offsetX: 10
          },
            subtitle: {
            offsetY: 15,
            text: "",
            fontFamily: "Roboto",
            fontSize: 16,
            align: 'left',
            fontColor: "#777",
            offsetX: 10
          },
          tooltip:{
            padding: 10,
            fontSize: 14,
            text: "%v <br>in %t",
            backgroundColor: "#fff",
            fontColor: "#444",
            borderRadius: "5px",
            borderColor: "#333",
            borderWidth: 1
          },
        
          legend: {
            offsetY: 80,
            offsetX: 0,
            padding: 10,
            backgroundColor: "transparent",
            borderWidth: "0px",
            highlightPlot: true,
            item: {
              fontSize: 18,
              fontColor: "#666",
              fontFamily: "Roboto",
              
            },
            marker:{
              borderRadius: 10,
              borderWidth: "0px",
            },
            cursor: "hand"
          },
          plotarea:{
            margin: "100 130 70 100"
          },
          plot:{
            borderRadius: "0 5 5 0",
            hightlightMarker: {
              backgroundColor:"red"
            },
            highlightState: {
              backgroundColor:"red"
            },
             animation:{
         	    effect: 4,
         	    method: 0,
         	    sequence: 1
         	  }
          },
          source: {
            text: "Source: sec.gov",
            fontColor: "#666",
            fontFamily: 'Roboto'
          },
         	scaleX: {
         	  labels: response.data.map(function(r){return r.country +" "+ (parseInt(r.year))}),
         	  item: {
         	    fontFamily: "Roboto",
         	    fontSize: 14
         	  },
         	  lineColor: "#DDD",
         	  tick:{
         	    visible: false
         	  }
         	},
         	scaleY: {
         	  label:{
         	    offsetY: 5,
         	    text: "",
         	    fontColor: "#777",
         	    fontSize: 14,
         	    fontFamily: "Roboto",
         	  },
         	  item: {
         	    // fontColor: "#fff",
         	    fontFamily: "Roboto",
         	    fontSize: 14
         	  },
         	  lineWidth: 0,
         	  tick: {
         	    visible: false
         	  },
         	  guide:{
         	    lineStyle: "solid",
         	    lineColor: "#DDD"
         	  },
         	  values: "5000"
         	},
        	series : [
        	  {
        		  text: "Var.",
        		  // values: [4820, 8067, 12000, 12100, 12282, 12540],
        		  values: response.data.map(function(r){return (r.var_)*100}),
        		  backgroundColor: "#d6d6d6",
        		  rules: [
        		    { rule: '%i==0', backgroundColor: '#f98377'},
        		    { rule: '%i==1', backgroundColor: '#fbd972'},
        		    { rule: '%i==2', backgroundColor: '#78e5d2'},
        		    { rule: '%i==3', backgroundColor: '#7ad8e5'},
        		    { rule: '%i==4', backgroundColor: '#d2f27c'},
        		    { rule: '%i==5', backgroundColor: '#e572ec'},
        		    { rule: '%i==6', backgroundColor: '#f98377'},
        		    { rule: '%i==7', backgroundColor: '#fbd972'},
        		    { rule: '%i==8', backgroundColor: '#78e5d2'},
        		    { rule: '%i==9', backgroundColor: '#7ad8e5'},
        		    { rule: '%i==10', backgroundColor: '#d2f27c'},
        		    { rule: '%i==11', backgroundColor: '#e572ec'},
        		    { rule: '%i==12', backgroundColor: '#f98377'},
        		    { rule: '%i==13', backgroundColor: '#fbd972'},
        		    { rule: '%i==14', backgroundColor: '#78e5d2'},
        		    { rule: '%i==15', backgroundColor: '#7ad8e5'},
        		    { rule: '%i==16', backgroundColor: '#d2f27c'},
        		    { rule: '%i==17', backgroundColor: '#e572ec'},
        		    { rule: '%i==18', backgroundColor: '#7ad8e5'},
        		    { rule: '%i==19', backgroundColor: '#d2f27c'},
        		    { rule: '%i==20', backgroundColor: '#e572ec'},
        		  ]
        		},
        
        		{
        		  text: "Education Expense Pub",
        		  // values: [2670, 6041, 11400, 11500,9832, 9275],
        		  values: response.data.map(function(r){return (r.educationExpensePub)*10}),
        		  backgroundColor: "#8e8e8e",
        		  rules: [
        		    { rule: '%i==0', backgroundColor: '#F55443'},
        		    { rule: '%i==1', backgroundColor: '#FFCC33'},
        		    { rule: '%i==2', backgroundColor: '#44b6a2'},
        		    { rule: '%i==3', backgroundColor: '#10A5BA'},
        		    { rule: '%i==4', backgroundColor: '#96BD2C'},
        		    { rule: '%i==5', backgroundColor: '#b42cbd'},
        		    { rule: '%i==6', backgroundColor: '#F55443'},
        		    { rule: '%i==7', backgroundColor: '#FFCC33'},
        		    { rule: '%i==8', backgroundColor: '#44b6a2'},
        		    { rule: '%i==9', backgroundColor: '#10A5BA'},
        		    { rule: '%i==10', backgroundColor: '#96BD2C'},
        		    { rule: '%i==11', backgroundColor: '#b42cbd'},
        		    { rule: '%i==12', backgroundColor: '#F55443'},
        		    { rule: '%i==13', backgroundColor: '#FFCC33'},
        		    { rule: '%i==14', backgroundColor: '#44b6a2'},
        		    { rule: '%i==15', backgroundColor: '#10A5BA'},
        		    { rule: '%i==16', backgroundColor: '#96BD2C'},
        		    { rule: '%i==17', backgroundColor: '#b42cbd'},
        		    { rule: '%i==18', backgroundColor: '#F55443'},
        		    { rule: '%i==19', backgroundColor: '#FFCC33'},
        		    { rule: '%i==20', backgroundColor: '#44b6a2'},
        		    
        		  ]
        		},
        		{
        		  text: "Education Expense Pib",
        		  values: response.data.map(function(r){return (r.educationExpensePib)*10}),
        		  // values: [1420, 4475, 10400, 10600, 7137, 6565],
        		  backgroundColor: "#494949",
        		  rules: [
        		    { rule: '%i==0', backgroundColor: '#EB1C12'},
        		    { rule: '%i==1', backgroundColor: '#FBA30A'},
        		    { rule: '%i==2', backgroundColor: '#1c8976'},
        		    { rule: '%i==3', backgroundColor: '#016B88'},
        		    { rule: '%i==4', backgroundColor: '#588C08'},
        		    { rule: '%i==5', backgroundColor: '#781c7e'},
        		    { rule: '%i==6', backgroundColor: '#EB1C12'},
        		    { rule: '%i==7', backgroundColor: '#FBA30A'},
        		    { rule: '%i==8', backgroundColor: '#1c8976'},
        		    { rule: '%i==9', backgroundColor: '#016B88'},
        		    { rule: '%i==10', backgroundColor: '#588C08'},
        		    { rule: '%i==11', backgroundColor: '#781c7e'},
        		    { rule: '%i==12', backgroundColor: '#EB1C12'},
        		    { rule: '%i==13', backgroundColor: '#FBA30A'},
        		    { rule: '%i==14', backgroundColor: '#1c8976'},
        		    { rule: '%i==15', backgroundColor: '#016B88'},
        		    { rule: '%i==16', backgroundColor: '#588C08'},
        		    { rule: '%i==17', backgroundColor: '#781c7e'},
        		    { rule: '%i==18', backgroundColor: '#016B88'},
        		    { rule: '%i==19', backgroundColor: '#588C08'},
        		    { rule: '%i==20', backgroundColor: '#781c7e'},
        		  ]
        		}
        	]
        };
        
        zingchart.render({ 
        	id : 'myChart', 
        	data : myConfig, 
        	height:800 , 
        	width: 1000 
        });
        
    });
    
}]);