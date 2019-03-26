var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use('/',express.static( path.join(__dirname,"public")));


const uri = "mongodb+srv://test:test@sos-project-enqlt.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var countries;

client.connect(err => {
  generalPublicExpenses = client.db("sos1819").collection("generalPublicExpenses");
  client.close();
  console.log("Connected!");
});




// -------------------API REST Antonio J-----------------------

var generalPublicExpenses = [{
        country: "espania",
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

    }
];

app.get("/api/v1/general-public-expenses/loadInitialData", (req, res) => {

    var newGeneralPublicExpenses = [{
        
        country: "espania",
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

    },
    {
        country: "francia",
        year: "2017",
        publicSpending: "1.291.948,0",
        educationExpense: "9,66",
        healthExpense: "16,97",
        defenseSpending: "4,01",
        publicSpendingPib: "56,50",
        var_: "-0,10"

    }, 
    {
        country: "italia",
        year: "2017",
        publicSpending: "840.763,0",
        educationExpense: "8,11",
        healthExpense: "13,47",
        defenseSpending: "3,12",
        publicSpendingPib: "48,70",
        var_: "-0,40"

    },
    {
        country: "reinoUnido",
        year: "2017",
        publicSpending: "954262,1",
        educationExpense: "13,91",
        healthExpense: "18,88",
        defenseSpending: "4,66",
        publicSpendingPib: "40,90"

}];

    newGeneralPublicExpenses.forEach((i) => {
        generalPublicExpenses.push(i)

    })
    res.sendStatus(200);
});

// GET /api/v1/generalPublicExpenses/

app.get("/api/v1/general-public-expenses", (req, res) => {
    
    generalPublicExpenses.find({}).toArray((err, generalPublicExpensesArray)=>{
        if(err)
            console.log("Error: "+err);
            
        res.send(generalPublicExpensesArray);
    });
    
});


// POST /api/v1/generalPublicExpenses

app.post("/api/v1/general-public-expenses", (req, res) => {

    var newGeneralPublicExpenses = req.body;

    generalPublicExpenses.push(newGeneralPublicExpenses)

    res.sendStatus(201);
});


// DELETE /api/v1/generalPublicExpenses/

app.delete("/api/v1/general-public-expenses", (req, res) => {

    generalPublicExpenses = [];

    res.sendStatus(200);
});


// GET /api/v1/generalPublicExpenses/espania

app.get("/api/v1/general-public-expenses/:country", (req, res) => {

    var country = req.params.country;

    var filteredGeneralPublicExpenses = generalPublicExpenses.filter((c) => {
        return c.country == country;
    })

    if (filteredGeneralPublicExpenses.length >= 1) {
        res.send(filteredGeneralPublicExpenses[0]);
    }
    else {
        res.sendStatus(404);
    }

});


// PUT /api/v1/generalPublicExpenses/espania

app.put("/api/v1/general-public-expenses/:country", (req, res) => {

    var country = req.params.country;
    var updatedGeneralPublicExpenses = req.body;
    var found = false;

    var updatedGeneralPublicExpenses = generalPublicExpenses.map((c) => {

        if (c.country == country) {
            found = true;
            return updatedGeneralPublicExpenses;
        }
        else {
            return c;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        generalPublicExpenses = updatedGeneralPublicExpenses;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/generalPublicExpenses/espania

app.delete("/api/v1/general-public-expenses/:country", (req, res) => {

    var country = req.params.country;
    var found = false;

    var updatedGeneralPublicExpenses = generalPublicExpenses.filter((c) => {

        if (c.country == country)
            found = true;

        return c.country != country;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        generalPublicExpenses = updatedGeneralPublicExpenses;
        res.sendStatus(200);
    }

});

// Métodos incorrectos
//PUT /api/v1/generalPublicExpenses (ERROR)

app.put("/api/v1/general-public-expenses", (req, res) => {


    res.sendStatus(405);

});

//POST /api/v1/generalPublicExpenses/espania (ERROR)

app.post("/api/v1/general-public-expenses/:country", (req, res) => {

    res.sendStatus(405);

});

//-----------------------------------------------------------------------

// -------------------API REST Juan Manuel Centeno-----------------------

const uriJMCC = "mongodb+srv://test:test@sos-idqtq.mongodb.net/test?retryWrites=true";
const clientJMCC = new MongoClient(uriJMCC, { useNewUrlParser: true });

var publicExpenditureEducations;

clientJMCC.connect(err => {
  publicExpenditureEducations = clientJMCC.db("sos1819").collection("public-expenditure-educations");
  clientJMCC.close();
  console.log("Connected!");
});


app.get("/api/v1/public-expenditure-educations/docs", (req, res) => {

    res.redirect("https://documenter.getpostman.com/view/4815062/S17oxV3R");
});



app.get("/api/v1/public-expenditure-educations/loadInitialData", (req, res) => {

    var newPublicExpenditureEducations = [{

    country: "espania",
    year: 2015,
    educationExpense: 46241.5,
    educationExpensePub: 9.77,
    educationExpensePib: 4.28,
    healthExpenditurePerCapita: 977,
    var_: -13.08,

}, {
    country: "alemania",
    year: 2015,
    educationExpense: 146754.1,
    educationExpensePub: 10.98,
    educationExpensePib: 4.81,
    healthExpenditurePerCapita: 1975,
    var_: -16.16,

}, {
    country: "reino unido",
    year: 2013,
    educationExpense: 133190.4,
    educationExpensePub: 13.91,
    educationExpensePib: 5.54,
    healthExpenditurePerCapita: 2028,
    var_: -10.36,

}, {
    country: "portugal",
    year: 2018,
    educationExpense: 133.4,
    educationExpensePub: 132.91,
    educationExpensePib: 52.54,
    healthExpenditurePerCapita: 228,
    var_: -10.36,

}, {
    country: "belgica",
    year: 2016,
    educationExpense: 13313.4,
    educationExpensePub: 13.91,
    educationExpensePib: 5.54,
    healthExpenditurePerCapita: 28,
    var_: -10.36,

}];

    
        
        publicExpenditureEducations.find({}).toArray((err, pEE) => {
            
            if(err){
                
                res.sendStatus(500);
                
            }else{
                
                if(pEE.length>0){
                    
                    res.sendStatus(409);
                    
                }else{
                    
                    newPublicExpenditureEducations.forEach((i) => {
                        console.log(i);
                        publicExpenditureEducations.insert(i);
                        
                    
                    });
                    res.sendStatus(200);
                }
                
            }
            
        });

    
    
});



// --------------------------------------------   GET /api/v1/public-expenditure-educations -----------------------------------------------------

app.get("/api/v1/public-expenditure-educations", (req, res) => {
    
        //Busqueda por año
        var startY = parseInt(req.query.from);
        var endY = parseInt(req.query.to);
        //Paginación
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
    
        
        //Paginación y Búsqueda
        if(Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(startY) && Number.isInteger(endY)){
        
            publicExpenditureEducations.find({ "year": { $gte: startY, $lte: endY } }).skip(offset).limit(limit).toArray( (err, publicExpenditureEducation) => {
    	        
        		if(err){
        			
        			res.sendStatus(500);
        			
        		}else{
        			
        			res.status(200).send(publicExpenditureEducation.map((c)=>{
        			    delete c._id;
        			    return c;
        			    
        			}));
        	
        		}
    	    });
    	   
    	//Paginacón
        }else if(Number.isInteger(limit) && Number.isInteger(offset) ){
            
            publicExpenditureEducations.find({}).skip(offset).limit(limit).toArray( (err, publicExpenditureEducation) => {
    	        
        		if(err){
        			
        			res.sendStatus(500);
        			
        		}else{
        			
        			res.status(200).send(publicExpenditureEducation.map((c)=>{
        			    delete c._id;
        			    return c;
        			    
        			}));
        	
        		}
    	    });
        //Búsqueda 
        }else if(Number.isInteger(startY) && Number.isInteger(endY)){
            
            publicExpenditureEducations.find({ "year": { $gte: startY, $lte: endY } }).toArray( (err, publicExpenditureEducation) => {
    	        
        		if(err){
        			
        			res.sendStatus(500);
        			
        		}else{
        			
        			res.status(200).send(publicExpenditureEducation.map((c)=>{
        			    delete c._id;
        			    return c;
        			    
        			}));
        	
        		}
    	    });
        }else{

            publicExpenditureEducations.find({}).toArray( (err, publicExpenditureEducation) => {
    	        
        		if(err){
        			
        			res.sendStatus(500);
        			
        		}else{
        			
        			res.status(200).send(publicExpenditureEducation.map((c)=>{
        			    delete c._id;
        			    return c;
        			    
        			}));
        	
        		}
    	    });
            
        }

    
});
    

	




// --------------------------------------------   POST /api/v1/public-expenditure-educations-----------------------------------------------------

app.post("/api/v1/public-expenditure-educations", (req, res) => {

	var data =  req.body;
    
    publicExpenditureEducations.find({ "country": data["country"] }).toArray((err,newPEE )=>{
    	
    	if(err){  //Error interno del servidor
    		
			res.sendStatus(500);
			
		}else{
			
			if(newPEE.length > 0){ // Ya existe el recurso
				
				res.sendStatus(409);
			
			}else{
			
				if( data["country"] == "" || data["year"] == null || data["educationExpense"] == null || data["educationExpensePub"] == null
				|| data["educationExpensePib"] == null || data["healthExpenditurePerCapita"] == null || data["var_"] == null){
							
					res.sendStatus(400);	// //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)
							
				}else{		
   

					publicExpenditureEducations.insert(data, (err, newPEE ) =>{
				
						if(err){
							
							res.sendStatus(500);
							
						}else{
							
							res.sendStatus(201);
								
						}
					
					});
				}
					
				
				
			}
			
		}
    });
});

// -------------------------------------------- DELETE /api/v1/public-expenditure-educations --------------------------------------------

app.delete("/api/v1/public-expenditure-educations", (req, res) => {

    publicExpenditureEducations.remove({},(err,publicExpenditureEducation )=>{
    	
    	if(err){
    		
			res.sendStatus(500);
			
		}else{
			
			res.sendStatus(200);
				
		}
    	
    });

    
});


//  -------------------------------------------- GET /api/v1/public-expenditure-educations/alemania  --------------------------------------------

app.get("/api/v1/public-expenditure-educations/:country", (req, res) => {
    var country = req.params.country;

	publicExpenditureEducations.find({"country":country}).toArray( (err, publicExpenditureEducation) => {
	    
		if(err){
			
			res.sendStatus(500);
			
		}else{
			
			if(publicExpenditureEducation.length<1){
				
				res.sendStatus(404);
				
			}else{
				
				if(country != publicExpenditureEducation[0]["country"]){
					
					
					res.sendStatus(400);
					
				}else{
					
					res.status(200).send({publicExpenditureEducation});
					
				}
				
				
				
			}
		}
	});
});



//   --------------------------------------------PUT /api/v1/public-expenditure-educations/españa   --------------------------------------------

app.put("/api/v1/public-expenditure-educations/:country", (req, res) => {

    var country = req.params.country;
    var updateData = req.body;

    publicExpenditureEducations.find({"country": country}).toArray( (err, findPublicExpenditureEducation)=>{
    	
    	if(err){ //error interno del servidor
    		
    		res.sendStatus(500);
    		
    	}else{
    		
    		
    		if(findPublicExpenditureEducation.length==0){ //Miramos si existe el recurso
    			
    			res.sendStatus(404);
    			
    		}else{
    			
    			if(country != updateData.country){ //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)
    				
    				res.sendStatus(400);
    				
    			}else{
    			
	    			publicExpenditureEducations.update({"country":country}, updateData, (err, updatePEE) => {
	    				
	    				if(err){
	    				
	    					res.sendStatus(500);	
	    					
	    				}else{
	    					
	    					res.sendStatus(200);
	    				
	    				}
	    				
	    			});
    			
    			}
    			
    		}
    		
    	}
    
    });
   
	
});


//  --------------------------------------------  DELETE /api/v1/public-expenditure-educations/espania   --------------------------------------------

app.delete("/api/v1/public-expenditure-educations/:country", (req, res) => {

   var country = req.params.country;

    publicExpenditureEducations.find({"country":country}).toArray( (err, deletePublicExpenditureEducations)=>{
    	
    	if(err){
    		
    		res.status(500);
    		
    	}else{
    	
    		if(deletePublicExpenditureEducations.length<1){
    			
    			res.sendStatus(404);
    			
    		}else{
    			
    			publicExpenditureEducations.remove({"country":country});
    			res.sendStatus(200);
    		
    		}
    	}
    });

});


//   --------------------------------------------Métodos erróneos  --------------------------------------------

//   -------------------------------------------- PUT /api/v1/public-expenditure-educations (ERROR)   --------------------------------------------

app.put("/api/v1/public-expenditure-educations", (req, res) => {

    res.sendStatus(405);

});


//   -------------------------------------------- POST /api/v1/public-expenditure-educations (ERROR)   --------------------------------------------

app.post("/api/v1/public-expenditure-educations/:country", (req, res) => {

    res.sendStatus(405);

});


//   -------------------------------------------- GET /api/v1/secute/public-expenditure-educations -------------------------------------------
app.get("/api/v1/secute/public-health-expenses", (req, res) => {
    
        var user = req.headers.user;
        var pass = req.headers.pass;
        
        if (user == "jmcc" && pass == "jmcc") { // pasamanos por la cabecera el usuario y la contraseña
            
            publicExpenditureEducations.find({}).toArray( (err, publicExpenditureEducation) => {
                    
                    if (err) {
                        
                        res.sendStatus(500);
                        
                    }else {
                        
                        res.send(publicExpenditureEducation.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                   
                });
            
            
        }else {
            // No autorizado
            res.sendStatus(401);
        }
    });



//----------------------------------------------------------------------------


// -------------------API REST Joaquín Morillo Capitán------------------------

var publicHealthExpenses = [{
    country: "españa",
    year: "2017",
    publicHealthExpense: "70,77",
    healthExpense: "72812,9",
    totalPublicExpense: "15,14",
    healthExpensePib: "6,26",
    healthExpenditurePerCapita: "1565",
    var_: "3,84"
}, {
    country: "alemania",
    year: "2017",
    publicHealthExpense: "85,00",
    healthExpense: "312672,0",
    totalPublicExpense: "21,36",
    healthExpensePib: "9,58",
    healthExpenditurePerCapita: "3789",
    var_: "7,24"
}, {
    country: "reino unido",
    year: "2017",
    publicHealthExpense: "78,71",
    healthExpense: "176435,0",
    totalPublicExpense: "18,88",
    healthExpensePib: "7,59",
    healthExpenditurePerCapita: "2681",
    var_: "-9,18"
}];

app.get("/api/v1/public-health-expenses/loadInitialData", (req, res) => {

    var newPublicHealthExpenses = [{
        country: "francia",
        year: "2017",
        publicHealthExpense: "82,99",
        healthExpense: "217528,3",
        totalPublicExpense: "16,97",
        healthExpensePib: "9,51",
        healthExpenditurePerCapita: "3247",
        var_: "3,80"
    }, {
        country: "italia",
        year: "2017",
        publicHealthExpense: "74,03",
        healthExpense: "113131,0",
        totalPublicExpense: "13,47",
        healthExpensePib: "6,59",
        healthExpenditurePerCapita: "1867",
        var_: "3,43"
    }];

    newPublicHealthExpenses.forEach((i) => {
        publicHealthExpenses.push(i);
    });

    res.sendStatus(200);
});


// GET /api/v1/public-health-expenses

app.get("/api/v1/public-health-expenses", (req, res) => {
    res.send(publicHealthExpenses);
});


// POST /api/v1/public-health-expenses

app.post("/api/v1/public-health-expenses", (req, res) => {

    var newPublicHealthExpenses = req.body;

    publicHealthExpenses.push(newPublicHealthExpenses);

    res.sendStatus(201);
});


// DELETE /api/v1/public-health-expenses

app.delete("/api/v1/public-health-expenses", (req, res) => {

    publicHealthExpenses = [];

    res.sendStatus(204);
});


// GET /api/v1/public-health-expenses/alemania

app.get("/api/v1/public-health-expenses/:country", (req, res) => {

    var country = req.params.country;

    var filteredPublicHealthExpenses = publicHealthExpenses.filter((c) => {
        return c.country == country;
    });

    if (filteredPublicHealthExpenses.length >= 1) {
        res.send(filteredPublicHealthExpenses[0]);
    }
    else {
        res.sendStatus(404);
    }

});


// PUT /api/v1/public-health-expenses/españa

app.put("/api/v1/public-health-expenses/:country", (req, res) => {

    var country = req.params.country;
    var updatedPublicHealthExpense = req.body;
    var found = false;

    var updatedPublicHealthExpenses = publicHealthExpenses.map((c) => {

        if (c.country == country) {
            found = true;
            return updatedPublicHealthExpense;
        }
        else {
            return c;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        publicHealthExpenses = updatedPublicHealthExpenses;
        res.sendStatus(204);
    }

});


// DELETE /api/v1/public-health-expenses/españa

app.delete("/api/v1/public-health-expenses/:country", (req, res) => {

    var country = req.params.country;
    var found = false;

    var updatedPublicHealthExpenses = publicHealthExpenses.filter((c) => {

        if (c.country == country)
            found = true;

        return c.country != country;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        publicHealthExpenses = updatedPublicHealthExpenses;
        res.sendStatus(204);
    }

});


// Métodos erróneos

//PUT /api/v1/public-health-expenses (ERROR)

app.put("/api/v1/public-health-expenses", (req, res) => {

    res.sendStatus(405);

});


//POST /api/v1/public-health-expenses (ERROR)

app.post("/api/v1/public-health-expenses/:country", (req, res) => {

    res.sendStatus(405);

});

//----------------------------------------------------------------------------


app.listen(port, () => {

    console.log("Super server ready on port " + port);
});
