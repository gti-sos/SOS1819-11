/*************************API REST Joaquín Morillo Capitán**************************/

const BASE_PATH = "/api/v1/public-health-expenses";

var api = {};

module.exports = api;

api.register = (app, publicHealthExpenses) => {

    app.get(BASE_PATH + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/6914253/S17ozAXZ");
    });

    app.get(BASE_PATH + "/loadInitialData", (req, res) => {

        var newPublicHealthExpenses = [{
            country: "france",
            year: 2017,
            publicHealthExpense: 82.99,
            healthExpense: 217528.3,
            totalPublicExpense: 16.97,
            healthExpensePib: 9.51,
            healthExpenditurePerCapita: 3247,
            var_: 3.80
        }, {
            country: "italy",
            year: 2017,
            publicHealthExpense: 74.03,
            healthExpense: 113131.0,
            totalPublicExpense: 13.47,
            healthExpensePib: 6.59,
            healthExpenditurePerCapita: 1867,
            var_: 3.43
        }, {
            country: "spain",
            year: 2017,
            publicHealthExpense: 70.77,
            healthExpense: 72812.9,
            totalPublicExpense: 15.14,
            healthExpensePib: 6.26,
            healthExpenditurePerCapita: 1565,
            var_: 3.84
        }, {
            country: "germany",
            year: 2017,
            publicHealthExpense: 85.00,
            healthExpense: 312672.0,
            totalPublicExpense: 21.36,
            healthExpensePib: 9.58,
            healthExpenditurePerCapita: 3789,
            var_: 7.24
        }, {
            country: "uk",
            year: 2017,
            publicHealthExpense: 78.71,
            healthExpense: 176435.0,
            totalPublicExpense: 18.88,
            healthExpensePib: 7.59,
            healthExpenditurePerCapita: 2681,
            var_: -9.18
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

    app.get(BASE_PATH, (req, res) => {

        // Búsqueda por año
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);

        // Paginación
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        var query = req.query;

        if (req.query.country) {
            query.country = req.query.country;
        }

        if (req.query.year) {
            query.year = Number(req.query.year);
        }

        if (req.query.publicHealthExpense) {
            query.publicHealthExpense = Number(req.query.publicHealthExpense);
        }

        if (req.query.healthExpense) {
            query.healthExpense = Number(req.query.healthExpense);
        }

        if (req.query.totalPublicExpense) {
            query.totalPublicExpense = Number(req.query.totalPublicExpense);
        }

        if (req.query.healthExpensePib) {
            query.healthExpensePib = Number(req.query.healthExpensePib);
        }

        if (req.query.healthExpenditurePerCapita) {
            query.healthExpenditurePerCapita = Number(req.query.healthExpenditurePerCapita);
        }

        if (req.query.var_) {
            query.var_ = Number(req.query.var_);
        }

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
        else if (JSON.stringify(query) != "{}") {
            publicHealthExpenses.find(query).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else if (!result.length) {
                    res.sendStatus(404);
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


    // GET /api/v1/public-health-expenses/spain
    // GET /api/v1/public-health-expenses/2017
    // 'country' OR 'year'

    app.get(BASE_PATH + "/:param", (req, res) => {

        var param = req.params.param;
        var query;

        if (Number.isInteger(param)) {
            query = { year: req.params.param };
        }
        else {
            query = { country: req.params.param };
        }

        publicHealthExpenses.find(query).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else if (result.length < 1) {
                res.sendStatus(404);
            }
            else if (result.length == 1) {
                delete result[0]._id;
                res.status(200).send(result[0]);
            }
            else {
                res.status(200).send(result.map((phe) => {
                    delete phe._id;
                    return phe;
                }));
            }
        });

    });


    // GET /api/v1/public-health-expenses/spain/2017
    // 'country' AND 'year'

    app.get(BASE_PATH + "/:country/:year", (req, res) => {

        var params = {
            country: req.params.country,
            year: Number(req.params.year)
        };

        publicHealthExpenses.find(params).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else if (result.length < 1) {
                res.sendStatus(404);
            }
            else {
                delete result[0]._id;
                res.status(200).send(result[0]);
            }
        });

    });


    // POST /api/v1/public-health-expenses

    app.post(BASE_PATH, (req, res) => {

        var newPHE = {
            country: req.body.country,
            year: Number(req.body.year),
            publicHealthExpense: Number(req.body.publicHealthExpense),
            healthExpense: Number(req.body.healthExpense),
            totalPublicExpense: Number(req.body.totalPublicExpense),
            healthExpensePib: Number(req.body.healthExpensePib),
            healthExpenditurePerCapita: Number(req.body.healthExpenditurePerCapita),
            var_: Number(req.body.var_)
        };

        // Se comprueba que no existe ningún error a la hora de introducir los valores de cada propiedad
        if (newPHE["country"] == "" ||
            !isNaN(newPHE["country"]) ||
            isNaN(newPHE["year"]) ||
            isNaN(newPHE["publicHealthExpense"]) ||
            isNaN(newPHE["healthExpense"]) ||
            isNaN(newPHE["totalPublicExpense"]) ||
            isNaN(newPHE["healthExpensePib"]) ||
            isNaN(newPHE["healthExpenditurePerCapita"]) ||
            isNaN(newPHE["var_"]) ||
            !newPHE.hasOwnProperty("country") ||
            !newPHE.hasOwnProperty("year") ||
            !newPHE.hasOwnProperty("publicHealthExpense") ||
            !newPHE.hasOwnProperty("healthExpense") ||
            !newPHE.hasOwnProperty("totalPublicExpense") ||
            !newPHE.hasOwnProperty("healthExpensePib") ||
            !newPHE.hasOwnProperty("healthExpenditurePerCapita") ||
            !newPHE.hasOwnProperty("var_")) {

            res.sendStatus(400);
        }
        else {
            publicHealthExpenses.find({ "country": newPHE["country"] }).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else if (result.length > 0 && newPHE["country"] == result[0].country && newPHE["year"] == result[0].year) {
                    res.sendStatus(409);
                }
                else {
                    publicHealthExpenses.insert(newPHE, (error, obj) => {
                        if (error) {
                            res.sendStatus(500);
                        }
                        else {
                            res.sendStatus(201);
                        }
                    });
                }
            });
        }
    });


    // PUT /api/v1/public-health-expenses/spain/2017

    app.put(BASE_PATH + "/:country/:year", (req, res) => {

        var params = {
            country: req.params.country,
            year: Number(req.params.year)
        };

        var newvalues = req.body;

        publicHealthExpenses.find(params).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else if (result.length == 0) {
                res.sendStatus(404);
            }
            else if (newvalues["country"] == "" ||
                !isNaN(newvalues["country"]) ||
                isNaN(newvalues["year"]) ||
                isNaN(newvalues["publicHealthExpense"]) ||
                isNaN(newvalues["healthExpense"]) ||
                isNaN(newvalues["totalPublicExpense"]) ||
                isNaN(newvalues["healthExpensePib"]) ||
                isNaN(newvalues["healthExpenditurePerCapita"]) ||
                isNaN(newvalues["var_"]) ||
                !newvalues.hasOwnProperty("country") ||
                !newvalues.hasOwnProperty("year") ||
                !newvalues.hasOwnProperty("publicHealthExpense") ||
                !newvalues.hasOwnProperty("healthExpense") ||
                !newvalues.hasOwnProperty("totalPublicExpense") ||
                !newvalues.hasOwnProperty("healthExpensePib") ||
                !newvalues.hasOwnProperty("healthExpenditurePerCapita") ||
                !newvalues.hasOwnProperty("var_")) {

                res.sendStatus(400);
            }
            else {
                publicHealthExpenses.update(params, newvalues, (error, obj) => {
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


    // DELETE /api/v1/public-health-expenses

    app.delete(BASE_PATH, (req, res) => {

        publicHealthExpenses.remove({}, (error, obj) => {
            if (error) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        });
    });


    // DELETE /api/v1/public-health-expenses/spain
    // DELETE /api/v1/public-health-expenses/2017
    // 'country' OR 'year'

    app.delete(BASE_PATH + "/:param", (req, res) => {

        var param = req.params.param;
        var query;

        if (Number.isInteger(param)) {
            query = { year: Number(req.params.param) };
        }
        else {
            query = { country: req.params.param };
        }

        publicHealthExpenses.find(query).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else if (result.length < 1) {
                res.sendStatus(404);
            }
            else {
                publicHealthExpenses.remove(query);
                res.sendStatus(204);
            }
        });
    });

    // DELETE /api/v1/public-health-expenses/spain/2017
    // 'country' AND 'year'

    app.delete(BASE_PATH + "/:country/:year", (req, res) => {

        var params = {
            country: req.params.country,
            year: Number(req.params.year)
        };

        publicHealthExpenses.find(params).toArray((error, result) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);
            }
            else if (result.length < 1) {
                res.sendStatus(404);
            }
            else {
                publicHealthExpenses.remove(params);
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

    app.put(BASE_PATH, (req, res) => {
        res.sendStatus(405);
    });


    //POST /api/v1/public-health-expenses (ERROR)

    app.post(BASE_PATH + "/:country/:year", (req, res) => {
        res.sendStatus(405);
    });

};

//----------------------------------------------------------------------------
