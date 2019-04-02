var BASE_PATH = "/api/v1/general-public-expenses"

var apiRest = {};


module.exports = apiRest;

apiRest.register = (app, generalPublicExpenses) => {

        app.get("/api/v1/general-public-expenses/docs", (req, res) => {

            res.redirect("https://documenter.getpostman.com/view/6869292/S17tRo7p");
        });

        app.get(BASE_PATH + "/loadInitialData", (req, res) => {

            var newGeneralPublicExpenses = [{

                    country: "espania",
                    year: 2017,
                    publicSpending: 478126.0,
                    educationExpense: 9.77,
                    healthExpense: 15.14,
                    defenseSpending: 2.99,
                    publicSpendingPib: 41.00,
                    var_: -1.20

                },
                {
                    country: "alemania",
                    year: 2017,
                    publicSpending: 1439839.0,
                    educationExpense: 10.98,
                    healthExpense: 21.36,
                    defenseSpending: 2.73,
                    publicSpendingPib: 43.90,
                    _var: 0

                },
                {
                    country: "francia",
                    year: 2017,
                    publicSpending: 1291948.0,
                    educationExpense: 9.66,
                    healthExpense: 16.97,
                    defenseSpending: 4.01,
                    publicSpendingPib: 56.50,
                    var_: -0.10

                },
                {
                    country: "italia",
                    year: 2017,
                    publicSpending: 840763.0,
                    educationExpense: 8.11,
                    healthExpense: 13.47,
                    defenseSpending: 3.12,
                    publicSpendingPib: 48.70,
                    var_: -0.40

                },
                {
                    country: "reino unido",
                    year: 2017,
                    publicSpending: 954262.1,
                    educationExpense: 13.91,
                    healthExpense: 18.88,
                    defenseSpending: 4.66,
                    publicSpendingPib: 40.90,
                    var_: -0.40

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

                            generalPublicExpenses.insert(i);


                        });
                        res.sendStatus(200);
                    }

                }

            });

        });

        // ------------------------------------- GET /api/v1/general-public-expenses ------------------------------------

        app.get(BASE_PATH, (req, res) => {

            //Busqueda por año
            var startY = parseInt(req.query.from);
            var endY = parseInt(req.query.to);
            //Paginación
            var limit = Number(req.query.limit);
            var offset = Number(req.query.offset);

            var queries = req.query;

            if (req.query.country) {

                queries.country = req.query.country;
            }

            if (req.query.year) {

                queries.year = Number(req.query.year);
            }

            if (req.query.publicSpending) {

                queries.publicSpending = Number(req.query.publicSpending);
            }

            if (req.query.educationExpense) {

                queries.educationExpense = Number(req.query.educationExpense);
            }

            if (req.query.healtExpense) {

                queries.healtExpense = Number(req.query.healtExpense);
            }

            if (req.query.defenseSpending) {

                queries.defenseSpending = Number(req.query.defenseSpending);
            }

            if (req.query.publicSpendingPib) {

                queries.publicSpendingPib = Number(req.query.publicSpendingPib);
            }

            if (req.query.var_) {

                queries.var_ = Number(req.query.var_);
            }



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

                generalPublicExpenses.find(queries).toArray((err, generalPublicExpenses) => {

                    if (err) {

                        res.sendStatus(500);

                    }
                    else {

                        if (!generalPublicExpenses.length) {

                            res.sendStatus(404);

                        }
                        else {

                            res.status(200).send(generalPublicExpenses.map((c) => {
                                delete c._id;
                                return c;

                            }));
                        }


                    }
                });

            }


        });

        // --------------------------------- POST /api/v1/general-public-expenses ------------------------------------------

        app.post(BASE_PATH, (req, res) => {

            var data = {
                country: req.body.country,
                year: req.body.year,
                publicSpending: req.body.publicSpending,
                educationExpense: req.body.educationExpense,
                healthExpense: req.body.healthExpense,
                defenseSpending: req.body.defenseSpending,
                publicSpendingPib: req.body.publicSpendingPib,
                var_: req.body.var_
            }

            if (data["country"] == "" || !isNaN(data["country"]) || isNaN(data["year"]) || isNaN(data["publicSpending"]) ||
                isNaN(data["educationExpense"]) || isNaN(data["healthExpense"]) ||
                isNaN(data["defenseSpending"]) || isNaN(data["publicSpendingPib"]) ||
                isNaN(data["var_"]) ||
                !data.hasOwnProperty("country") || !data.hasOwnProperty("year") || !data.hasOwnProperty("publicSpending") ||
                !data.hasOwnProperty("educationExpense") || !data.hasOwnProperty("healthExpense") ||
                !data.hasOwnProperty("defenseSpending") || !data.hasOwnProperty("publicSpendingPib") ||
                !data.hasOwnProperty("var_")) {

                res.sendStatus(400); // //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)

            }
            else {

                generalPublicExpenses.find({ "country": data["country"] }).toArray((err, newGPP) => {

                    if (err) { //Error interno del servidor

                        res.sendStatus(500);

                    }
                    else {

                        if (newGPP.length > 0) { // Ya existe el recurso

                            res.sendStatus(409);

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
                });
            }

        }); //------------------------------------------------ DELETE /api/v1/general-public-expenses --------------------------------

        app.delete(BASE_PATH, (req, res) => {

            generalPublicExpenses.remove({}, (err, generalPublicExpenses) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    res.sendStatus(200);

                }
            });
        });
        //  -------------------------------------------- GET /api/v1/general-public-expenses/espania  --------------------------------------------

        // country or year



        app.get(BASE_PATH + "/:param", (req, res) => {

            var data = Number(req.params.param);
            var queries;

            if (Number.isInteger(data)) {

                queries = { year: Number(req.params.param) };

            }
            else {

                queries = { country: req.params.param };

            }

            generalPublicExpenses.find(queries).toArray((err, generalPublicExpenses) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    if (generalPublicExpenses.length < 1) {

                        res.sendStatus(404);

                    }
                    else {

                        if (queries["country"] != generalPublicExpenses[0]["country"] && Number.isNaN(queries["country"])) {


                            res.sendStatus(400);

                        }
                        else if (queries["year"] != generalPublicExpenses[0]["year"] && Number.isInteger(queries["year"])) {


                            res.sendStatus(400);

                        }
                        else {



                            if (generalPublicExpenses.length == 1) {
                                delete generalPublicExpenses[0]._id;
                                res.status(200).send(generalPublicExpenses[0]);


                            }
                            else {

                                res.status(200).send(generalPublicExpenses.map((c) => {
                                    delete c._id;
                                    return c;

                                }));

                            }



                        }

                    }
                }
            });
        });


        // country and year

        app.get(BASE_PATH + "/:country/:year", (req, res) => {

            var params = {
                country: req.params.country,
                year: Number(req.params.year)

            }

            generalPublicExpenses.find(params).toArray((err, generalPublicExpenses) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    if (generalPublicExpenses.length < 1) {

                        res.sendStatus(404);

                    }
                    else {


                        delete generalPublicExpenses[0]._id;
                        res.status(200).send(generalPublicExpenses[0]);



                    }
                }
            });
        });

        //   --------------------------------------------PUT /api/v1/general-public-expenses/espania   --------------------------------------------

        app.put(BASE_PATH + "/:country/:year", (req, res) => {

            var params = {
                country: req.params.country,
                year: Number(req.params.year)

            }

            var updateData = req.body;

            generalPublicExpenses.find(params).toArray((err, findGeneralPublicExpenses) => {

                if (err) { //error interno del servidor

                    res.sendStatus(500);

                }
                else {

                    if (findGeneralPublicExpenses.length == 0) { //Miramos si existe el recurso

                        res.sendStatus(404);

                    }
                    else {
                        //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)
                        if (updateData.country != req.params.country || updateData.year != params["year"] || !isNaN(updateData.country) ||
                            isNaN(updateData.year) || isNaN(updateData.publicSpending) || isNaN(updateData.educationExpense) ||
                            isNaN(updateData.healtExpense) || isNaN(updateData.defenseSpending) || isNaN(updateData.publicSpendingPib) ||
                            isNaN(updateData.var_) ||
                            !updateData.hasOwnProperty("country") || !updateData.hasOwnProperty("year") || !updateData.hasOwnProperty("publicSpending") ||
                            !updateData.hasOwnProperty("educationExpense") || !updateData.hasOwnProperty("healthExpense") ||
                            !updateData.hasOwnProperty("defenseSpending") || !updateData.hasOwnProperty("publicSpendingPib") ||
                            !updateData.hasOwnProperty("var_")) {


                            res.sendStatus(400);

                        }
                        else {


                            generalPublicExpenses.update(params, updateData, (err, updateGPP) => {

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

        //  --------------------------------------------  DELETE /api/v1/general-public-expenses/espania   --------------------------------------------

        //country or year

        app.delete(BASE_PATH + "/:param", (req, res) => {

            var data = Number(req.params.param);
            var queries;

            if (Number.isInteger(data)) {

                queries = { year: Number(req.params.param) };

            }
            else {

                queries = { country: req.params.param };

            }


            generalPublicExpenses.find(queries).toArray((err, deleteGeneralPublicExpenses) => {

                if (err) {

                    res.status(500);

                }
                else {

                    if (deleteGeneralPublicExpenses.length < 1) {

                        res.sendStatus(404);

                    }
                    else {

                        generalPublicExpenses.remove(queries);
                        res.sendStatus(200);

                    }
                }
            });

        });

        //country and year

        app.delete(BASE_PATH + "/:country/:year", (req, res) => {

            var params = {
                country: req.params.country,
                year: Number(req.params.year)

            }


            generalPublicExpenses.find(params).toArray((err, deleteGeneralPublicExpenses) => {

                if (err) {

                    res.status(500);

                }
                else {

                    if (deleteGeneralPublicExpenses.length < 1) {

                        res.sendStatus(404);

                    }
                    else {

                        generalPublicExpenses.remove(params);
                        res.sendStatus(200);

                    }
                }
            });

        });


        //----------------------------------------------- Métodos incorrectos ------------------------------------------------
        //----------------------------------------------- PUT /api/v1/general-public-expenses (ERROR) ------------------------

        app.put(BASE_PATH, (req, res) => {


            res.sendStatus(405);

        });

        //-------------------------------------------------- POST /api/v1/general-public-expenses/espania (ERROR) ----------------------

        app.post(BASE_PATH + "/:country", (req, res) => {

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

}
        //----------------------------------------------------FIN-----------------------------------------------------
