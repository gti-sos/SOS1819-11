var app = angular.module("App");


app.controller("Api-sos-ext1", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    var apiExt2 = {
        
        method: 'GET',
        url: "https://api.openbrewerydb.org/breweries",
        headers: {
            "Accept": "application/json"
        }
    };
    
    
    
    $http(apiExt2).then(function(response) {
        
        

     var touristDeparture = [];
     var arrivalTourist = [];
            for(var i=0; i<5;i++){
                var e = response.data.slice(i,i+1).map(function(d){return d["incomeTourist"]});
                e = e[0];
                incomeTourist.push(e);
            }
            
            for(var i=0; i<5;i++){
                var e = response.data.slice(i,i+1).map(function(d){return d["touristDeparture"]});
                e = e[0];
                touristDeparture.push(e);
            }
            
           
            
           

    d3.select(".chart") // Selecciona el identificador en donde se va a mostrar la gráfica 
      .selectAll("div") // Selecciona todas las etiquetas div que se van a ir agregando después del identificador 
      .data(incomeTourist) // Agregar el arreglo con los datos
      .enter() // Crea los nuevos nodos
      .append("div") // Crea nuevas instancias con la etiqueta div
      .transition() // Agregar animación 
      .duration(2000) // Duración de la animación 
      .style("width", function(d) {
        return d + "px"; // La función obtiene los valores del arreglo y lo retorna al width
      })
      .text(function(d) {
        return d; // La función obtiene los valores del arreglo y lo retorna como texto
      })
     
    
    d3.select(".chart1") // Selecciona el identificador en donde se va a mostrar la gráfica 
      .selectAll("div") // Selecciona todas las etiquetas div que se van a ir agregando después del identificador 
      .data(arrivalTourist) // Agregar el arreglo con los datos
      .enter() // Crea los nuevos nodos
      .append("div") // Crea nuevas instancias con la etiqueta div
      .transition() // Agregar animación 
      .duration(2000) // Duración de la animación 
      .style("width", function(d) {
        return d + "px"; // La función obtiene los valores del arreglo y lo retorna al width
      })
      .text(function(d) {
        return d; // La función obtiene los valores del arreglo y lo retorna como texto
      })
      
     
    })
           
    
    
}]);