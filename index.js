var express = require("express");
var moment = require("moment");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());




var port = process.env.PORT || 8080;



app.listen(port, ()=>{
    
    console.log("Magit us happening in port"+ port);
});

app.get("/time", (request, response) => {
    
    var localLocale = moment();
    var fecha = 'Fecha: '+ localLocale.add(1, 'hour').locale('es').format('LLLL');

    response.send(fecha);
    
    
});

//API REST Antonio J

var gastosPublicos = [{
    country: "españa",
    year: "2017",
    publicSpending: "478126,0",
    educationExpense: "9,77",
    healthExpense: "15,14",
    defenseSpending: "2,99",
    publicSpendingPib: "41,00",
    //var: "-1,20"
    
    },
    {
    country: "alemania",
    year: "2017",
    publicSpending: "1439839,0",
    educationExpense: "10,98",
    healthExpense: "21,36",
    defenseSpending: "2,73",
    publicSpendingPib: "43,90",
    //var: "0"
    
    }];

// GET /gastosPublicos/

app.get("/gastosPublicos", (req, res) =>{
    res.send(gastosPublicos);
});


// POST /gastosPublicos/

app.post("/gastosPublicos", (req,res)=>{
    
    var newGastoPublico = req.body;
    
    gastosPublicos.push(newGastoPublico)
    
    res.sendStatus(201);
});


// DELETE /gastosPublicos/

app.delete("/gastosPublicos", (req,res)=>{
    
    gastosPublicos =  [];

    res.sendStatus(200);
});


// GET /gastosPublicos/españa

app.get("/gastosPublicos/:country", (req,res)=>{

    var country = req.params.country;

    var filteredGastosPublicos = gastosPublicos.filter((c) =>{
       return c.country == country; 
    })
    
    if (filteredGastosPublicos.length >= 1){
        res.send(filteredGastosPublicos[0]);
    }else{
        res.sendStatus(404);
    }

});


// PUT /gastosPublicos/españa

app.put("/gastosPublicos/:country", (req,res)=>{

    var country = req.params.country;
    var updatedGastosPublicos = req.body;
    var found = false;

    var updatedGastosPublicos = gastosPublicos.map((c) =>{
    
        if(c.country == country){
            found = true;
            return updatedGastosPublicos;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        gastosPublicos = updatedGastosPublicos;
        res.sendStatus(200);
    }

});


// DELETE /contacts/españa

app.delete("/gastosPublicos/:country", (req,res)=>{

    var country = req.params.country;
    var found = false;

    var updatedGastosPublicos = gastosPublicos.filter((c) =>{
        
            if(c.country == country)  
                found = true;
        
            return c.country != country;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        gastosPublicos = updatedGastosPublicos;
        res.sendStatus(200);
    }

});


app.use("/", express.static(__dirname + "/public"))




