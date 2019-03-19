var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;



app.use("/", express.static(__dirname + "/public"))

// -------------------API REST Antonio J-----------------------

var generalPublicExpenses = [{
    country: "españa",
    year: "2017",
    publicSpending: "478126,0",
    educationExpense: "9,77",
    healthExpense: "15,14",
    defenseSpending: "2,99",
    publicSpendingPib: "41,00",
    var_: "-1,20"
    
    },
    {
    country: "alemania",
    year: "2017",
    publicSpending: "1439839,0",
    educationExpense: "10,98",
    healthExpense: "21,36",
    defenseSpending: "2,73",
    publicSpendingPib: "43,90",
    _var: "0"
    
    }];
    
app.get("/api/v1/generalPublicExpenses/loadInitialData", (req,res)=>{
    
    var newGeneralPublicExpenses = [{
    
    country: "francia",
    year: "2017",
    publicSpending: "1.291.948,0",
    educationExpense: "9,66",
    healthExpense: "16,97",
    defenseSpending: "4,01",
    publicSpendingPib: "56,50",
    var_: "-0,10"
    
    },{
    country: "italia",
    year: "2017",
    publicSpending: "840.763,0",
    educationExpense: "8,11",
    healthExpense: "13,47",
    defenseSpending: "3,12",
    publicSpendingPib: "48,70",
    var_: "-0,40"
    
}];
    
    newGeneralPublicExpenses.forEach( (i)=>{
       generalPublicExpenses.push(i) 
        
    })
    res.sendStatus(200);
});

// GET /api/v1/generalPublicExpenses/

app.get("/api/v1/generalPublicExpenses", (req, res) =>{
    res.send(generalPublicExpenses);
});


// POST /api/v1/generalPublicExpenses

app.post("/api/v1/generalPublicExpenses", (req,res)=>{
    
    var newGeneralPublicExpenses = req.body;
    
    generalPublicExpenses.push(newGeneralPublicExpenses)
    
    res.sendStatus(201);
});


// DELETE /api/v1/generalPublicExpenses/

app.delete("/api/v1/generalPublicExpenses", (req,res)=>{
    
    generalPublicExpenses =  [];

    res.sendStatus(200);
});


// GET /api/v1/generalPublicExpenses/españa

app.get("/api/v1/generalPublicExpenses/:country", (req,res)=>{

    var country = req.params.country;

    var filteredGeneralPublicExpenses = generalPublicExpenses.filter((c) =>{
       return c.country == country; 
    })
    
    if (filteredGeneralPublicExpenses.length >= 1){
        res.send(filteredGeneralPublicExpenses[0]);
    }else{
        res.sendStatus(404);
    }

});


// PUT /api/v1/generalPublicExpenses/españa

app.put("/api/v1/generalPublicExpenses/:country", (req,res)=>{

    var country = req.params.country;
    var updatedGeneralPublicExpenses = req.body;
    var found = false;

    var updatedGeneralPublicExpenses = generalPublicExpenses.map((c) =>{
    
        if(c.country == country){
            found = true;
            return updatedGeneralPublicExpenses;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        generalPublicExpenses = updatedGeneralPublicExpenses;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/generalPublicExpenses/españa

app.delete("/api/v1/generalPublicExpenses/:country", (req,res)=>{

    var country = req.params.country;
    var found = false;

    var updatedGeneralPublicExpenses = generalPublicExpenses.filter((c) =>{
        
            if(c.country == country)  
                found = true;
        
            return c.country != country;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        generalPublicExpenses = updatedGeneralPublicExpenses;
        res.sendStatus(200);
    }

});

// Métodos incorrectos
//PUT /api/v1/generalPublicExpenses (ERROR)

app.put("/api/v1/generalPublicExpenses", (req,res)=>{
        
   
        res.sendStatus(405);

});

//POST /api/v1/generalPublicExpenses/españa (ERROR)

app.post("/api/v1/generalPublicExpenses/:country", (req,res)=>{
   
        res.sendStatus(405);

});

//-----------------------------------------------------------------------

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

// GET /api/v1/public-expenditure-educations/alemania

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

app.post("/api/v1/public-expenditure-educations/:country", (req,res)=>{
   
        res.sendStatus(405);

});

//----------------------------------------------------------------------------


app.listen(port, () => {
    
    console.log("Super server ready on port " + port);
});



