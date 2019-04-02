var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, "public")));

// --------------------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------API REST Antonio J----------------------------------------------------------------------

const uriAJSM = "mongodb+srv://test:test@sos-project-enqlt.mongodb.net/test?retryWrites=true";
const clientAJSM = new MongoClient(uriAJSM, { useNewUrlParser: true });

var generalPublicExpenses;

clientAJSM.connect(err => {
    generalPublicExpenses = clientAJSM.db("sos1819").collection("general-public-expenses");
    console.log("Connected! server general-public-expenses");
});

app.get("/api/v1/general-public-expenses/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6869292/S17tRo7p");
});


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
            country: "reino unido",
            year: "2017",
            publicSpending: "954262,1",
            educationExpense: "13,91",
            healthExpense: "18,88",
            defenseSpending: "4,66",
            publicSpendingPib: "40,90",
            var_: "-0,40"

        }
    ];

    generalPublicExpenses.find({}).toArray((err, GPP) => {

        if (err) {

            res.sendStatus(500);

        }
        else {

            if (GPP.length > 0) {

                res.sendStatus(409);

            }
            else {

                newGeneralPublicExpenses.forEach((i) => {
                    console.log(i);
                    generalPublicExpenses.insert(i);


                });
                res.sendStatus(200);
            }

        }

    });

});

// ------------------------------------- GET /api/v1/general-public-expenses ------------------------------------

app.get("/api/v1/general-public-expenses", (req, res) => {

    //Busqueda por año
    var startY = parseInt(req.query.from);
    var endY = parseInt(req.query.to);
   
    //Paginación
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);


    //Paginación y Búsqueda
    if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(startY) && Number.isInteger(endY)) {

        generalPublicExpenses.find({ "year": { $gte: startY, $lte: endY } }).skip(offset).limit(limit).toArray((err, generalPublicExpenses) => {

            if (err) {

                res.sendStatus(500);

            }
            else {

                res.status(200).send(generalPublicExpenses.map((c) => {
                    delete c._id;
                    return c;

                }));

            }
        });

        //Paginacón
    }
    else if (Number.isInteger(limit) && Number.isInteger(offset)) {

        generalPublicExpenses.find({}).skip(offset).limit(limit).toArray((err, generalPublicExpenses) => {

            if (err) {

                res.sendStatus(500);

            }
            else {

                res.status(200).send(generalPublicExpenses.map((c) => {
                    delete c._id;
                    return c;

                }));

            }
        });
        //Búsqueda 
    }
    else if (Number.isInteger(startY) && Number.isInteger(endY)) {

        generalPublicExpenses.find({ "year": { $gte: startY, $lte: endY } }).toArray((err, generalPublicExpenses) => {

            if (err) {

                res.sendStatus(500);

            }
            else {

                res.status(200).send(generalPublicExpenses.map((c) => {
                    delete c._id;
                    return c;

                }));

            }
        });
    }
    else {

        generalPublicExpenses.find({}).toArray((err, generalPublicExpenses) => {

            if (err) {

                res.sendStatus(500);

            }
            else {

                res.status(200).send(generalPublicExpenses.map((c) => {
                    delete c._id;
                    return c;

                }));

            }
        });

    }


});


// --------------------------------- POST /api/v1/general-public-expenses ------------------------------------------

app.post("/api/v1/general-public-expenses", (req, res) => {

    var data = req.body;

    generalPublicExpenses.find({ "country": data["country"] }).toArray((err, newGPP) => {

        if (err) { //Error interno del servidor

            res.sendStatus(500);

        }
        else {

            if (newGPP.length > 0) { // Ya existe el recurso

                res.sendStatus(409);

            }
            else {

                if (data["country"] == "" || data["year"] == null || data["publicSpending"] == null || data["educationExpense"] == null ||
                    data["healthExpense"] == null || data["defenseSpending"] == null || data["publicSpendingPib"] == null || data["var_"] == null) {

                    res.sendStatus(400); // //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)

                }
                else {


                    generalPublicExpenses.insert(data, (err, newGPP) => {

                        if (err) {

                            res.sendStatus(500);

                        }
                        else {

                            res.sendStatus(201);

                        }

                    });
                }



            }

        }
    });
});


//------------------------------------------------ DELETE /api/v1/general-public-expenses --------------------------------

app.delete("/api/v1/general-public-expenses", (req, res) => {

    generalPublicExpenses.remove({}, (err, generalPublicExpenses) => {

        if (err) {

            res.sendStatus(500);

        }
        else {

            res.sendStatus(200);

        }
    });
});


//------------------------------------------ GET /api/v1/general-public-expenses/espania -------------------------------------

app.get("/api/v1/general-public-expenses/:country", (req, res) => {

    var country = req.params.country;

    generalPublicExpenses.find({ "country": country }).toArray((err, generalPublicExpenses) => {

        if (err) {

            res.sendStatus(500);

        }
        else {

            if (generalPublicExpenses.length < 1) {

                res.sendStatus(404);

            }
            else {

                if (country != generalPublicExpenses[0]["country"]) {

                    res.sendStatus(400);

                }
                else {

                    res.status(200).send({ generalPublicExpenses });
                }
            }
        }
    });
});


//------------------------------------------------------- PUT /api/v1/general-public-expenses/espania -------------------------------------

app.put("/api/v1/general-public-expenses/:country", (req, res) => {

    var country = req.params.country;
    var updateData = req.body;

    generalPublicExpenses.find({ "country": country }).toArray((err, findGeneralPublicExpenses) => {

        if (err) { //error interno del servidor

            res.sendStatus(500);

        }
        else {


            if (findGeneralPublicExpenses.length == 0) { //Miramos si existe el recurso

                res.sendStatus(404);

            }
            else {

                if (country != updateData.country) { //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)

                    res.sendStatus(400);

                }
                else {

                    generalPublicExpenses.update({ "country": country }, updateData, (err, updateGPP) => {

                        if (err) {

                            res.sendStatus(500);

                        }
                        else {

                            res.sendStatus(200);

                        }

                    });

                }

            }

        }

    });


});


//----------------------------------------------------- DELETE /api/v1/general-public-expenses/espania------------------------------

app.delete("/api/v1/general-public-expenses/:country", (req, res) => {

    var country = req.params.country;

    generalPublicExpenses.find({ "country": country }).toArray((err, deleteGeneralPublicExpenses) => {

        if (err) {

            res.status(500);

        }
        else {

            if (deleteGeneralPublicExpenses.length < 1) {

                res.sendStatus(404);

            }
            else {

                generalPublicExpenses.remove({ "country": country });
                res.sendStatus(200);

            }
        }
    });

});

//----------------------------------------------- Métodos incorrectos ------------------------------------------------
//----------------------------------------------- PUT /api/v1/general-public-expenses (ERROR) ------------------------

app.put("/api/v1/general-public-expenses", (req, res) => {


    res.sendStatus(405);

});

//-------------------------------------------------- POST /api/v1/general-public-expenses/espania (ERROR) ----------------------

app.post("/api/v1/general-public-expenses/:country", (req, res) => {

    res.sendStatus(405);

});


//   -------------------------------------------- GET /api/v1/secure/general-public-expenses -------------------------------------------
app.get("/api/v1/secure/general-public-expenses", (req, res) => {

    var user = req.headers.user;
    var pass = req.headers.pass;

    if (user == "ajsm" && pass == "ajsm") { // pasamanos por la cabecera el usuario y la contraseña

        generalPublicExpenses.find({}).toArray((err, generalPublicExpenses) => {

            if (err) {

                res.sendStatus(500);

            }
            else {

                res.send(generalPublicExpenses.map((c) => {
                    delete c._id;
                    return c;
                }));
            }

        });


    }
    else {
        // No autorizado
        res.sendStatus(401);
    }
});


//-----------------------------------------------------------------------

// -------------------API REST Juan Manuel Centeno-----------------------



const uriJMCC = "mongodb+srv://test:test@sos-idqtq.mongodb.net/test?retryWrites=true";
const clientJMCC = new MongoClient(uriJMCC, { useNewUrlParser: true });

var publicExpenditureEducationsAPI = require("./publicExpenditureEducationsAPI/index.js");
var publicExpenditureEducations;

clientJMCC.connect(err => {
    publicExpenditureEducations = clientJMCC.db("sos1819").collection("public-expenditure-educations");
    
    publicExpenditureEducationsAPI.register(app,publicExpenditureEducations );
    console.log("Connected!");
});


//---------------------------------------------------------------------------

// -------------------API REST Joaquín Morillo Capitán------------------------

var publicHealthExpenses;

// const MongoClient = require("mongodb").MongoClient;
const uriJMC = "mongodb+srv://test:test@sos-xfza6.mongodb.net/test?retryWrites=true";
const clientJMC = new MongoClient(uriJMC, { useNewUrlParser: true });

clientJMC.connect(err => {
    publicHealthExpenses = clientJMC.db("SOS1819").collection("public-health-expenses");
    console.log("Connected with public-health-expenses!");
    // perform actions on the collection object
    //   client_jmc.close();
});


app.get("/api/v1/public-health-expenses/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6914253/S17ozAXZ");
});


app.get("/api/v1/public-health-expenses/loadInitialData", (req, res) => {

    var newPublicHealthExpenses = [{
        country: "francia",
        year: 2017,
        publicHealthExpense: "82,99",
        healthExpense: "217528,3",
        totalPublicExpense: "16,97",
        healthExpensePib: "9,51",
        healthExpenditurePerCapita: "3247",
        var_: "3,80"
    }, {
        country: "italia",
        year: 2017,
        publicHealthExpense: "74,03",
        healthExpense: "113131,0",
        totalPublicExpense: "13,47",
        healthExpensePib: "6,59",
        healthExpenditurePerCapita: "1867",
        var_: "3,43"
    }, {
        country: "espania",
        year: 2017,
        publicHealthExpense: "70,77",
        healthExpense: "72812,9",
        totalPublicExpense: "15,14",
        healthExpensePib: "6,26",
        healthExpenditurePerCapita: "1565",
        var_: "3,84"
    }, {
        country: "alemania",
        year: 2017,
        publicHealthExpense: "85,00",
        healthExpense: "312672,0",
        totalPublicExpense: "21,36",
        healthExpensePib: "9,58",
        healthExpenditurePerCapita: "3789",
        var_: "7,24"
    }, {
        country: "reino unido",
        year: 2017,
        publicHealthExpense: "78,71",
        healthExpense: "176435,0",
        totalPublicExpense: "18,88",
        healthExpensePib: "7,59",
        healthExpenditurePerCapita: "2681",
        var_: "-9,18"
    }];

    publicHealthExpenses.find({}).toArray((error, result) => {
        if (error) {
            console.log("Error: " + error);
            res.sendStatus(500);
        }
        else if (result.length > 0) {
            res.sendStatus(409);
        }
        else {
            newPublicHealthExpenses.forEach((i) => {
                publicHealthExpenses.insert(i);
            });

            res.sendStatus(201);
        }
    });

});


// GET /api/v1/public-health-expenses

app.get("/api/v1/public-health-expenses", (req, res) => {

    // Búsqueda por año
    var from = parseInt(req.query.from);
    var to = parseInt(req.query.to);

    // Paginación
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);

    // Paginación y búsqueda
    if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(from) && Number.isInteger(to)) {
        publicHealthExpenses.find({ "year": { $gte: from, $lte: to } }).skip(offset).limit(limit).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else {
                res.status(200).send(result.map((phe) => {
                    delete phe._id;
                    return phe;
                }));
            }
        });
    }
    // Paginación
    else if (Number.isInteger(limit) && Number.isInteger(offset)) {
        publicHealthExpenses.find({}).skip(offset).limit(limit).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else {
                res.status(200).send(result.map((phe) => {
                    delete phe._id;
                    return phe;
                }));
            }
        });
    }
    // Búsqueda
    else if (Number.isInteger(from) && Number.isInteger(to)) {
        publicHealthExpenses.find({ "year": { $gte: from, $lte: to } }).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else {
                res.status(200).send(result.map((phe) => {
                    delete phe._id;
                    return phe;
                }));
            }
        });
    }
    else {
        publicHealthExpenses.find({}).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else {
                res.status(200).send(result.map((phe) => {
                    delete phe._id;
                    return phe;
                }));
            }
        });
    }
});


// POST /api/v1/public-health-expenses

app.post("/api/v1/public-health-expenses", (req, res) => {

    var newPublicHealthExpenses = req.body;

    publicHealthExpenses.find({ "country": newPublicHealthExpenses["country"] }).toArray((error, result) => {
        if (error) {
            console.log("Error: " + error);
            res.sendStatus(500);
        }
        else if (result.length > 0) {
            res.sendStatus(409);
        }
        else if (newPublicHealthExpenses["country"] == "" || newPublicHealthExpenses["year"] == null || newPublicHealthExpenses["publicHealthExpense"] == "" || newPublicHealthExpenses["healthExpense"] == "" ||
            newPublicHealthExpenses["totalPublicExpense"] == "" || newPublicHealthExpenses["healthExpensePib"] == "" || newPublicHealthExpenses["healthExpenditurePerCapita"] == null || newPublicHealthExpenses["var_"] == "") {
            res.sendStatus(400);
        }
        else {
            publicHealthExpenses.insert(newPublicHealthExpenses, (error, obj) => {
                if (error) {
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(201);
                }
            });
        }
    });

});


// DELETE /api/v1/public-health-expenses

app.delete("/api/v1/public-health-expenses", (req, res) => {

    publicHealthExpenses.remove({}, (error, obj) => {
        if (error) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(204);
        }
    });
});


// GET /api/v1/public-health-expenses/alemania

app.get("/api/v1/public-health-expenses/:country", (req, res) => {

    var country = req.params.country;

    publicHealthExpenses.find({ "country": country }).toArray((error, result) => {
        if (error) {
            console.log("Error: " + error);
            res.sendStatus(500);
        }
        else if (result.length < 1) {
            res.sendStatus(404);
        }
        else if (country != result[0]["country"]) {
            res.sendStatus(400);
        }
        else {
            res.status(200).send(result.map((phe) => {
                delete phe._id;
                return phe;
            }));
        }
    });

});


// PUT /api/v1/public-health-expenses/alemania

app.put("/api/v1/public-health-expenses/:country", (req, res) => {

    var country = req.params.country;
    var newvalues = req.body;

    publicHealthExpenses.find({ "country": country }).toArray((error, result) => {
        if (error) {
            console.log("Error: " + error);
            res.sendStatus(500);
        }
        else if (result.length == 0) {
            res.sendStatus(404);
        }
        else if (country != newvalues.country) {
            res.sendStatus(400);
        }
        else {
            publicHealthExpenses.update({ "country": country }, newvalues, (error, obj) => {
                if (error) {
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(204);
                }
            });
        }
    });
});


// DELETE /api/v1/public-health-expenses/alemania

app.delete("/api/v1/public-health-expenses/:country", (req, res) => {

    var country = req.params.country;

    publicHealthExpenses.find({ "country": country }).toArray((error, result) => {
        if (error) {
            console.log("Error: " + error);
            res.sendStatus(500);
        }
        else if (result.length < 1) {
            res.sendStatus(404);
        }
        else {
            publicHealthExpenses.remove({ "country": country });
            res.sendStatus(204);
        }
    });
});


// GET /api/v1/secure/public-health-expenses

app.get("/api/v1/secure/public-health-expenses", (req, res) => {

    var user = req.headers.user;
    var password = req.headers.pass;

    if (user == "jmc" && password == "jmc") {
        publicHealthExpenses.find({}).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else {
                res.send(result.map((phe) => {
                    delete phe._id;
                    return phe;
                }));
            }

        });
    }
    else {
        res.sendStatus(401);
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
