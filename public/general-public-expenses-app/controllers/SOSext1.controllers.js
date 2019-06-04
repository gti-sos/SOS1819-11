var app = angular.module("App");


app.controller("Api-sos-ext1", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    

    
    var apiExt1 = {
        
        method: 'GET',
        url: "https://api.openbrewerydb.org/breweries",
        headers: {
            "Accept": "application/json"
        }
    };
    
    
   $http(apiExt1).then(function(response) {
        
        var dat1 = [];
            for(var i=0; i<8;i++){
                var e = response.data.slice(i,i+1).map(function(d){return d["latitude"]});
                e = e[0];
                dat1.push(e);
            }
            
            //Ancho y Altura
            var w = 1340;
            var h = 200;
            var barPadding = 1;
            //Creará un elemento SVG 
            var svg = d3.select(".barras")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
            svg.selectAll("rect")
                .data(dat1)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return i * (w / dat1.length);
                }).attr("y", function(d) {
                    return h - d;  //Altura menos el dato
                }).attr("width", w / dat1.length - barPadding)
                .attr("height", function(d) {
                    return d*4;  //Solo el dato
                }).attr("fill", function(d) {
                    return "rgb(0,123, " + (d * 10) + ")";
                });
            svg.selectAll("text").data(dat1).enter().append("text")
                .text(function(d){
                    return d+" latitude";
                }).attr("text-anchor", "middle")
                .attr("x", function(d, i) {
			   		return i * (w / dat1.length) + (w / dat1.length - barPadding) / 2;
			   })
			   .attr("y", function(d) {
			   		return h - (d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");
			   
            
        });
        
            
    
    
    
}]);