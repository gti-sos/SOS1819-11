var express = require("express");
var moment = require("moment")

var app = express();


var port = process.env.PORT || 8080;



app.listen(port, ()=>{
    
    console.log("Magit us happening in port"+ port);
});

app.get("/time", (request, response) => {
    
    var localLocale = moment();
    var fecha = 'Fecha: '+ localLocale.add(1, 'hour').locale('es').format('LLLL');

    response.send(fecha);
    
    
});


app.use("/", express.static(__dirname + "/public"))




