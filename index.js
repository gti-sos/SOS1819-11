var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;



app.use("/", express.static(__dirname + "/public"))

// -------------------API REST Antonio J-----------------------

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

// -------------------API REST Juan Manuel Centeno-----------------------


var publicExpenditureEducations = [{
    
    country: "espania",
    year: "2015",
    educationExpense: "46241,5",
    educationExpensePub: "9,77",
    educationExpensePib: "4,28",
    healthExpenditurePerCapita: "977",
    var_: "-13,08",
    
    },{
    country: "alemania",
    year: "2015",
    educationExpense: "146754,1",
    educationExpensePub: "10,98",
    educationExpensePib: "4,81",
    healthExpenditurePerCapita: "1975",
    var_: "-16,16",
    
    },{
    country: "reino unido",
    year: "2016",
    educationExpense: "133190,4",
    educationExpensePub: "13,91",
    educationExpensePib: "5,54",
    healthExpenditurePerCapita: "2028",
    var_: "-10,36",
    
}];

app.get("/api/v1/public-expenditure-educations/loadInitialData", (req,res)=>{
    
    var newPublicExpenditureEducations = [{
    
    country: "francia",
    year: "2015",
    educationExpense: "120127,6",
    educationExpensePub: "9,66",
    educationExpensePib: "5,46",
    healthExpenditurePerCapita: "1803",
    var_: "-15,71",
    
    },{
    country: "italia",
    year: "2015",
    educationExpense: "67411,0",
    educationExpensePub: "8,11",
    educationExpensePib: "4,08",
    healthExpenditurePerCapita: "1110",
    var_: "-14,82",
    
}];
    
    newPublicExpenditureEducations.forEach( (i)=>{
       publicExpenditureEducations.push(i) 
        
    })
    res.sendStatus(200);
});


// GET /api/v1/public-expenditure-educations

app.get("/api/v1/public-expenditure-educations", (req,res)=>{
    res.send(publicExpenditureEducations);
});

// POST /api/v1/public-expenditure-educations

app.post("/api/v1/public-expenditure-educations", (req,res)=>{
    
    var newPublicExpenditureEducations = req.body;
    
    publicExpenditureEducations.push(newPublicExpenditureEducations)
    
    res.sendStatus(201);
});

// DELETE /api/v1/public-expenditure-educations

app.delete("/api/v1/public-expenditure-educations", (req,res)=>{
    
    publicExpenditureEducations =  [];

    res.sendStatus(204);
});

// GET /api/v1/public-expenditure-educations/españa

app.get("/api/v1/public-expenditure-educations/:country", (req,res)=>{

    var country = req.params.country;

    var filteredPublicExpenditureEducations = publicExpenditureEducations.filter((c) =>{
       return c.country == country; 
    })
    
    if (filteredPublicExpenditureEducations.length >= 1){
        res.send(filteredPublicExpenditureEducations[0]);
    }else{
        res.sendStatus(404);
    }

});

// PUT /api/v1/public-expenditure-educations/españa

app.put("/api/v1/public-expenditure-educations/:country", (req,res)=>{

    var country = req.params.country;
    var updatedPublicExpenditureEducation = req.body;
    var found = false;

    var updatedPublicExpenditureEducations = publicExpenditureEducations.map((c) =>{
    
        if(c.country == country){
            found = true;
            return updatedPublicExpenditureEducation;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        publicExpenditureEducations = updatedPublicExpenditureEducations;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/public-expenditure-educations/españa

app.delete("/api/v1/public-expenditure-educations/:country", (req,res)=>{

    var country = req.params.country;
    var found = false;

    var updatedPublicExpenditureEducations = publicExpenditureEducations.filter((c) =>{
        
            if(c.country == country)  
                found = true;
        
            return c.country != country;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        publicExpenditureEducations = updatedPublicExpenditureEducations;
        res.sendStatus(200);
    }

});


// Métodos incorrectos
//PUT /api/v1/public-expenditure-educations (ERROR)

app.put("/api/v1/public-expenditure-educations", (req,res)=>{
        
   
        res.sendStatus(405);

});

//POST /api/v1/public-expenditure-educations (ERROR)

app.post("/api/v1/public-expenditure-educations/country", (req,res)=>{

   
        res.sendStatus(405);

});

//----------------------------------------------------------------------------


app.listen(port, () => {
    
    console.log("Super server ready on port " + port);
});



