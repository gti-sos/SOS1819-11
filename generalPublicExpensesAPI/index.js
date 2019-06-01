var BASE_PATH = "/api/v1/general-public-expenses"

var apiRest = {};


module.exports = apiRest;

apiRest.register = (app, generalPublicExpenses) => {
        
        // Al hacer un get a la ruta /api/v1/general-public-expenses/docs redirijo a "https://documenter.getpostman.com/view/6869292/S17tRo7p"
        app.get("/api/v1/general-public-expenses/docs", (req, res) => {

            res.redirect("https://documenter.getpostman.com/view/6869292/S17tRo7p");
        });

        // Load Initial Data
        app.get(BASE_PATH + "/loadInitialData", (req, res) => {

            var newGeneralPublicExpenses = [{

                    country: "spain",
                    year: 2017,
                    publicSpending: 478126.0,
                    educationExpense: 9.77,
                    healthExpense: 15.14,
                    defenseSpending: 2.99,
                    publicSpendingPib: 41.00,
                    var_: -1.20

                },
                {

                    country: "spain",
                    year: 2016,
                    publicSpending: 563726.0,
                    educationExpense: 15.77,
                    healthExpense: 5.14,
                    defenseSpending: 9.99,
                    publicSpendingPib: 50.00,
                    var_: -0.20

                },
                {

                    country: "spain",
                    year: 2015,
                    publicSpending: 89566.0,
                    educationExpense: 5.77,
                    healthExpense: 10.14,
                    defenseSpending: 19.99,
                    publicSpendingPib: 80.00,
                    var_: -8.20

                },
                {
                    country: "germany",
                    year: 2017,
                    publicSpending: 1439839.0,
                    educationExpense: 10.98,
                    healthExpense: 21.36,
                    defenseSpending: 2.73,
                    publicSpendingPib: 43.90,
                    var_: 1.78

                },
                {
                    country: "germany",
                    year: 2016,
                    publicSpending: 4984839.0,
                    educationExpense: 18.98,
                    healthExpense: 1.36,
                    defenseSpending: 8.73,
                    publicSpendingPib: 63.90,
                    var_: 4.78

                },
                {
                    country: "germany",
                    year: 2015,
                    publicSpending: 457862.0,
                    educationExpense: 65.98,
                    healthExpense: 12.36,
                    defenseSpending: 8.73,
                    publicSpendingPib: 69.90,
                    var_: 7.78

                },
                {
                    country: "germany",
                    year: 2014,
                    publicSpending: 36542.0,
                    educationExpense: 23.98,
                    healthExpense: 1.36,
                    defenseSpending: 20.73,
                    publicSpendingPib: 4.90,
                    var_: 1.78

                },
                {
                    country: "france",
                    year: 2017,
                    publicSpending: 1291948.0,
                    educationExpense: 9.66,
                    healthExpense: 16.97,
                    defenseSpending: 4.01,
                    publicSpendingPib: 56.50,
                    var_: -0.10

                },
                {
                    country: "france",
                    year: 2016,
                    publicSpending: 1291948.0,
                    educationExpense: 9.66,
                    healthExpense: 16.97,
                    defenseSpending: 4.01,
                    publicSpendingPib: 56.50,
                    var_: -0.10

                },
                {
                    country: "france",
                    year: 2015,
                    publicSpending: 1291948.0,
                    educationExpense: 9.66,
                    healthExpense: 16.97,
                    defenseSpending: 4.01,
                    publicSpendingPib: 56.50,
                    var_: -0.10

                },
                {
                    country: "france",
                    year: 2014,
                    publicSpending: 1291948.0,
                    educationExpense: 9.66,
                    healthExpense: 16.97,
                    defenseSpending: 4.01,
                    publicSpendingPib: 56.50,
                    var_: -0.10

                },
                {
                    country: "italy",
                    year: 2017,
                    publicSpending: 840763.0,
                    educationExpense: 8.11,
                    healthExpense: 13.47,
                    defenseSpending: 3.12,
                    publicSpendingPib: 48.70,
                    var_: -0.40

                },
                {
                    country: "united kingdom",
                    year: 2017,
                    publicSpending: 954262.1,
                    educationExpense: 13.91,
                    healthExpense: 18.88,
                    defenseSpending: 4.66,
                    publicSpendingPib: 40.90,
                    var_: -0.40

                }
            ];
            
            //Codigos de estado Load Initial Data
            
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

        app.get( BASE_PATH, (req, res) => {
    
        //Busqueda por año
        var startY = parseInt(req.query.from);
        var endY = parseInt(req.query.to);
        
        //Paginación
        var limit = Number(req.query.limit);
        var offset = Number(req.query.offset);
    
            
        var queries = req.query;
        
        
        
        if(req.query.country){
        
            queries.country = req.query.country; 
        }
        
        if(req.query.year){
            
            queries.year = Number(req.query.year); 
        }  
        
        if(req.query.publicSpending){
            
             queries.publicSpending = Number(req.query.publicSpending); 
        } 
            
        if(req.query.educationExpense){
            
             queries.educationExpense = Number(req.query.educationExpense);
        } 
        
        if(req.query.healthExpense){
            
             queries.healthExpense = Number(req.query.healthExpense);
        }
        
        if(req.query.defenseSpending){
            
             queries.defenseSpending = Number(req.query.defenseSpending);
        }
        
        if(req.query.publicSpendingPib){
            
             queries.publicSpendingPib = Number(req.query.publicSpendingPib);
        }
        
        if(req.query.var_ ){
            
             queries.var_ = Number(req.query.var_);
        }
       
    
    
        //Paginación y Búsqueda
        if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(startY) && Number.isInteger(endY)) {
    
            generalPublicExpenses.find({ "year": { $gte: startY, $lte: endY } }).skip(offset).limit(limit).toArray((err, generalPublicExpenses) => {
    
                if (err) {
                    console.log("Error: " + err);
                    res.sendStatus(500);
    
                }
                else {
                    
                    if (generalPublicExpenses.length == 0){
                        
                        res.sendStatus(404);
                    }else{
                        res.status(200).send(generalPublicExpenses.map((c) => {
                            console.log("Paginación y búsqueda  from,  to");
                            delete c._id;
                            return c;
    
                        }));
                    }
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
                    
                    if(generalPublicExpenses.length == 0){
                        
                        res.sendStatus(404);
                        
                    }else{
    
                        res.status(200).send(generalPublicExpenses.map((c) => {
                            delete c._id;
                        
                            return c;
    
                        }));
                    
                    }
    
                }
            });
        }
        else {
            
                // si no esta vacio entra
                if(JSON.stringify(queries) != "{}"){
            
                        generalPublicExpenses.find(queries).toArray((err, generalPublicExpenses) => {
                
                            if (err) {
                
                                res.sendStatus(500);
                
                            }
                            else {
                                
                                if(!generalPublicExpenses.length ){
                                    
                                    res.sendStatus(404);
                                    
                                }else{
                
                                    res.status(200).send(generalPublicExpenses.map((c) => {
                                        delete c._id;
                                        return c;
                    
                                    }));
                                }
                                
                
                            }
                        });
                        
                }else{
                    
                    
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
    
        }
    
    
    });
    

        // --------------------------------- POST /api/v1/general-public-expenses ------------------------------------------

        app.post(BASE_PATH, (req, res) => {
    
        var data = {
            country: req.body.country,
            year: Number(req.body.year),
            publicSpending: Number(req.body.publicSpending),
            educationExpense: Number(req.body.educationExpense),
            healthExpense: Number(req.body.healthExpense),
            defenseSpending: Number(req.body.defenseSpending),
            publicSpendingPib: Number(req.body.publicSpendingPib),
            var_: Number(req.body.var_)
        }
        
        
        if (data["country"] == ""|| !isNaN(data["country"]) || isNaN(data["year"]) || isNaN(data["publicSpending"]) ||
            isNaN(data["educationExpense"]) || isNaN(data["healthExpense"]) || 
            isNaN(data["defenseSpending"]) || isNaN(data["publicSpendingPib"])|| isNaN(data["var_"]) ||
            !data.hasOwnProperty("country") || !data.hasOwnProperty("year") || !data.hasOwnProperty("publicSpending")
            || !data.hasOwnProperty("educationExpense") || !data.hasOwnProperty("healthExpense")
            || !data.hasOwnProperty("defenseSpending") || !data.hasOwnProperty("publicSpendingPib") || !data.hasOwnProperty("var_")
            || data["publicSpending"] == 0 || data["educationExpense"] == 0 || data["healthExpense"] == 0 || data["defenseSpending"] == 0
            || data["publicSpendingPib"] == 0 || data["var_"] == 0) {
                            
            res.sendStatus(400); // //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)
    
        }else{
    
            generalPublicExpenses.find({ "country": data["country"], "year": data["year"]}).toArray((err, newGPP) => {
        
                if (err) { //Error interno del servidor
                    console.log("Error: " + err);
                    res.sendStatus(500);
        
                }else {
                    // Si existe el pais, pues se comprueba si el pais y eño es el mismo
                    //si es el año y pais iguales pues se envia un 409
                    // sino pues se crea
                    if(newGPP.length > 0){
                    
                        res.sendStatus(409);
            
                    }else{
                            
                           generalPublicExpenses.insert(data, (err, newGPP) => {
        
                             if (err) {
        
                                    res.sendStatus(500);
        
                                }else {
        
                                    res.sendStatus(201);
        
                                }
        
                            }); 
                            
                        }
                    
                    
                     }
                    
                });
            
             }
        
        });
    
    //------------------------------------------------ DELETE /api/v1/general-public-expenses --------------------------------

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
    
    
    
    app.get( BASE_PATH + "/:param", (req, res) => {
        
        var data = Number(req.params.param);
        var queries;
        
        if(Number.isInteger(data)){
            
             queries = {year: Number(req.params.param)};
            
        }else{
            
             queries = {country: req.params.param};
            
        }
    
        
        
        generalPublicExpenses.find(queries).toArray((err, generalPublicExpenses) => {

            if (err) {
    
                res.sendStatus(500);
    
            }else {

                if (generalPublicExpenses.length < 1 && Number.isInteger(data)) {
    
                    res.sendStatus(404);
    
                }else {
    
                    
     
                    if(generalPublicExpenses.length==1){
                        delete generalPublicExpenses[0]._id;
                        res.status(200).send(generalPublicExpenses[0]);
                                  
                                
                    }else{
                                
                        res.status(200).send(generalPublicExpenses.map((c) => {
                            delete c._id;
                            return c;
                                    
                        }));
                                
                    }
    
                }
            }
        });
    });
    
    
    // country and year
    
    app.get( BASE_PATH + "/:country/:year", (req, res) => {
        
        var params = {
            country: req.params.country,
            year: Number(req.params.year)
            
        } 
    
        generalPublicExpenses.find(params).toArray((err, GPP) => {
    
            if (err) {
    
                res.sendStatus(500);
    
            }
            else {
    
                if (GPP.length == 0) {
    
                    res.sendStatus(404);
    
                }
                else {
    
               
                    delete GPP[0]._id;
                    res.status(200).send(GPP[0]);
                                    
                
    
                }
            }
        });
    });
    
    
    
    

        //   --------------------------------------------PUT /api/v1/general-public-expenses/espania   --------------------------------------------

         app.put( BASE_PATH + "/:country/:year", (req, res) => {
    
        var params = {
            country: req.params.country,
            year: parseInt(req.params.year)
            
        } 
        
            var updateData ={
                country: req.body.country,
                year: Number(req.body.year),
                publicSpending: Number(req.body.publicSpending),
                educationExpense: Number(req.body.educationExpense),
                healthExpense: Number(req.body.healthExpense),
                defenseSpending: Number(req.body.defenseSpending),
                publicSpendingPib: Number(req.body.publicSpendingPib),
                var_: Number(req.body.var_)
        };
    
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
                    if (updateData.country != req.params.country || updateData.year != params["year"] || !isNaN(updateData.country) 
                        ||  isNaN(updateData.year) || isNaN(updateData.publicSpending) || isNaN(updateData.educationExpense) 
                        || isNaN(updateData.healthExpense) || isNaN(updateData.defenseSpending) || isNaN(updateData.publicSpendingPib)|| isNaN(updateData.var_)
                        || !updateData.hasOwnProperty("country") || !updateData.hasOwnProperty("year") || !updateData.hasOwnProperty("publicSpending")
                        || !updateData.hasOwnProperty("educationExpense") || !updateData.hasOwnProperty("healthExpense")
                        || !updateData.hasOwnProperty("defenseSpending") || !updateData.hasOwnProperty("publicSpendingPib") || !updateData.hasOwnProperty("var_")
                        || updateData.publicSpending == "" || updateData.educationExpense == "" || updateData.healthExpense == "" || updateData.defenseSpending == ""
                        || updateData.publicSpendingPib == "" || updateData.var_ == ""){
                            
                        
                        res.sendStatus(400);
    
                    }else {
                       
    
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
