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
