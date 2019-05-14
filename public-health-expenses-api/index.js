/*************************API REST Joaquín Morillo Capitán**************************/

const BASE_PATH = "/api/v2/public-health-expenses";

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


    // GET BASE_PATH

    app.get(BASE_PATH, (req, res) => {

        // Búsqueda por años y país
        var from;
        var to;
        var country = "";

        // Paginación
        var limit;
        var offset;

        var query = req.query;

        if (req.query.from) {
            from = parseInt(req.query.from, 10);
        }

        if (req.query.to) {
            to = parseInt(req.query.to, 10);
        }

        if (req.query.limit) {
            limit = parseInt(req.query.limit, 10);
        }

        if (req.query.offset) {
            offset = parseInt(req.query.offset, 10);
        }

        if (req.query.country) {
            query.country = req.query.country;
            country = req.query.country;
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

        // Paginación y búsqueda (country, from, to)
        if (country != "" && Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(from) && Number.isInteger(to)) {
            publicHealthExpenses.find({ "country": country, "year": { $gte: from, $lte: to } }).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación y búsqueda (country, from, to)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        /*************************************************/
        // Paginación y búsqueda (from, to)
        else if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(from) && Number.isInteger(to)) {
            publicHealthExpenses.find({ "year": { $gte: from, $lte: to } }).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación y búsqueda (from, to)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Paginación y búsqueda (country, from)
        else if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(from) && country != "") {
            publicHealthExpenses.find({ "country": country, "year": { $gte: from } }).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación y búsqueda (country, from)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Paginación y búsqueda (country, to)
        else if (Number.isInteger(limit) && Number.isInteger(offset) && country != "" && Number.isInteger(to)) {
            publicHealthExpenses.find({ "country": country, "year": { $lte: to } }).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación y búsqueda (country, to)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Paginación y búsqueda (country)
        else if (Number.isInteger(limit) && Number.isInteger(offset) && country != "") {
            publicHealthExpenses.find({ "country": country }).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación y búsqueda (country)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Paginación y búsqueda (from)
        else if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(from)) {
            publicHealthExpenses.find({ "year": { $gte: from } }).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación y búsqueda (from)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Paginación y búsqueda (to)
        else if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(to)) {
            publicHealthExpenses.find({ "year": { $lte: to } }).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación y búsqueda (to)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Paginación y búsqueda
        else if (Number.isInteger(limit) && Number.isInteger(offset)) {
            publicHealthExpenses.find({}).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación y búsqueda");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        /*************************************************/
        // Paginación
        else if (Number.isInteger(limit) && Number.isInteger(offset)) {
            publicHealthExpenses.find({}).skip(offset).limit(limit).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Paginación");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Búsqueda (country, from, to)
        else if (country != "" && Number.isInteger(from) && Number.isInteger(to)) {
            publicHealthExpenses.find({ "country": country, "year": { $gte: from, $lte: to } }).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else if (!result.length) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Búsqueda (country, from, to)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Búsqueda (country, from)
        else if (country != "" && Number.isInteger(from)) {
            publicHealthExpenses.find({ "country": country, "year": { $gte: from } }).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else if (!result.length) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Búsqueda (country, from)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Búsqueda (country, to)
        else if (country != "" && Number.isInteger(to)) {
            publicHealthExpenses.find({ "country": country, "year": { $lte: to } }).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else if (!result.length) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Búsqueda (country, to)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Búsqueda (from, to)
        else if (Number.isInteger(from) && Number.isInteger(to)) {
            publicHealthExpenses.find({ "year": { $gte: from, $lte: to } }).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Búsqueda (from, to)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Búsqueda (from)
        else if (Number.isInteger(from)) {
            publicHealthExpenses.find({ "year": { $gte: from } }).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Búsqueda (from)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Búsqueda (to)
        else if (Number.isInteger(to)) {
            publicHealthExpenses.find({ "year": { $lte: to } }).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Búsqueda (to)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Búsqueda (según los parámetros)
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
                        console.log("Búsqueda (según los parámetros)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
        // Búsqueda (total)
        else {
            publicHealthExpenses.find({}).toArray((error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                }
                else {
                    res.status(200).send(result.map((phe) => {
                        console.log("Búsqueda (total)");
                        delete phe._id;
                        return phe;
                    }));
                }
            });
        }
    });


    // GET BASE_PATH/spain
    // GET BASE_PATH/2017
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


    // GET BASE_PATH/spain/2017
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


    // POST BASE_PATH

    app.post(BASE_PATH, (req, res) => {

        // var newPHE = {
        //     country: req.body.country,
        //     year: Number(req.body.year),
        //     publicHealthExpense: Number(req.body.publicHealthExpense),
        //     healthExpense: Number(req.body.healthExpense),
        //     totalPublicExpense: Number(req.body.totalPublicExpense),
        //     healthExpensePib: Number(req.body.healthExpensePib),
        //     healthExpenditurePerCapita: Number(req.body.healthExpenditurePerCapita),
        //     var_: Number(req.body.var_)
        // };

        var newPHE = {
            country: req.body.country,
            year: req.body.year,
            publicHealthExpense: req.body.publicHealthExpense,
            healthExpense: req.body.healthExpense,
            totalPublicExpense: req.body.totalPublicExpense,
            healthExpensePib: req.body.healthExpensePib,
            healthExpenditurePerCapita: req.body.healthExpenditurePerCapita,
            var_: req.body.var_
        };

        // Se comprueba que no existe ningún error a la hora de introducir los valores de cada propiedad
        if (newPHE["country"] == "" ||
            // !isNaN(newPHE["country"]) ||
            // isNaN(newPHE["year"]) ||
            // isNaN(newPHE["publicHealthExpense"]) ||
            // isNaN(newPHE["healthExpense"]) ||
            // isNaN(newPHE["totalPublicExpense"]) ||
            // isNaN(newPHE["healthExpensePib"]) ||
            // isNaN(newPHE["healthExpenditurePerCapita"]) ||
            // isNaN(newPHE["var_"]) ||
            newPHE["country"] == null ||
            newPHE["year"] == null ||
            newPHE["publicHealthExpense"] == null ||
            newPHE["healthExpense"] == null ||
            newPHE["totalPublicExpense"] == null ||
            newPHE["healthExpensePib"] == null ||
            newPHE["healthExpenditurePerCapita"] == null ||
            newPHE["var_"] == null ||
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
            newPHE = {
                country: req.body.country,
                year: Number.parseFloat(req.body.year),
                publicHealthExpense: Number.parseFloat(req.body.publicHealthExpense),
                healthExpense: Number.parseFloat(req.body.healthExpense),
                totalPublicExpense: Number.parseFloat(req.body.totalPublicExpense),
                healthExpensePib: Number.parseFloat(req.body.healthExpensePib),
                healthExpenditurePerCapita: Number.parseFloat(req.body.healthExpenditurePerCapita),
                var_: Number.parseFloat(req.body.var_)
            };
            publicHealthExpenses.find({ "country": newPHE["country"], "year": newPHE["year"] }).toArray((error, result) => {
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


    // POST BASE_PATH/spain

    app.post(BASE_PATH + "/:country", (req, res) => {

        var country = req.params.country;

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
            newPHE["country"] != country ||
            isNaN(newPHE["year"]) ||
            isNaN(newPHE["publicHealthExpense"]) ||
            isNaN(newPHE["healthExpense"]) ||
            isNaN(newPHE["totalPublicExpense"]) ||
            isNaN(newPHE["healthExpensePib"]) ||
            isNaN(newPHE["healthExpenditurePerCapita"]) ||
            isNaN(newPHE["var_"]) ||
            newPHE["country"] == null ||
            newPHE["year"] == null ||
            newPHE["publicHealthExpense"] == null ||
            newPHE["healthExpense"] == null ||
            newPHE["totalPublicExpense"] == null ||
            newPHE["healthExpensePib"] == null ||
            newPHE["healthExpenditurePerCapita"] == null ||
            newPHE["var_"] == null ||
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
            publicHealthExpenses.find({ "country": newPHE["country"], "year": newPHE["year"] }).toArray((error, result) => {
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


    // PUT BASE_PATH/spain/2017

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
                newvalues["country"] != params.country ||
                newvalues["year"] != params.year ||
                !isNaN(newvalues["country"]) ||
                isNaN(newvalues["year"]) ||
                isNaN(newvalues["publicHealthExpense"]) ||
                isNaN(newvalues["healthExpense"]) ||
                isNaN(newvalues["totalPublicExpense"]) ||
                isNaN(newvalues["healthExpensePib"]) ||
                isNaN(newvalues["healthExpenditurePerCapita"]) ||
                isNaN(newvalues["var_"]) ||
                newvalues["country"] == null ||
                newvalues["year"] == null ||
                newvalues["publicHealthExpense"] == null ||
                newvalues["healthExpense"] == null ||
                newvalues["totalPublicExpense"] == null ||
                newvalues["healthExpensePib"] == null ||
                newvalues["healthExpenditurePerCapita"] == null ||
                newvalues["var_"] == null ||
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


    // DELETE BASE_PATH

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


    // DELETE BASE_PATH/spain
    // DELETE BASE_PATH/2017
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

    // DELETE BASE_PATH/spain/2017
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

    app.get("/api/v2/secure/public-health-expenses", (req, res) => {

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

    //PUT BASE_PATH (ERROR)

    app.put(BASE_PATH, (req, res) => {
        res.sendStatus(405);
    });


    //PUT BASE_PATH/spain (ERROR)

    app.put(BASE_PATH + "/:country", (req, res) => {
        res.sendStatus(405);
    });


    //POST BASE_PATH/spain/2017 (ERROR)

    app.post(BASE_PATH + "/:country/:year", (req, res) => {
        res.sendStatus(405);
    });

};

//----------------------------------------------------------------------------
