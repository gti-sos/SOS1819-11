

var BASE_PATH = "/api/v2/public-expenditure-educations"

var apiRest = {};


module.exports = apiRest;



apiRest.register = (app, publicExpenditureEducations) => {

    app.get("/api/v2/public-expenditure-educations/docs", (req, res) => {
    
        res.redirect("https://documenter.getpostman.com/view/4815062/S17xrkNG");
    });
    
    
    
    app.get(BASE_PATH + "/loadInitialData", (req, res) => {
    
        var newPublicExpenditureEducations = [
        {
    
            country: "spain", year: 2015, educationExpense: 46241.5, educationExpensePub: 9.77, educationExpensePib: 4.28, healthExpenditurePerCapita: 977, var_: -13.08,
    
        }, {
            country: "germany", year: 2015, educationExpense: 146754.1, educationExpensePub: 10.98, educationExpensePib: 4.81, healthExpenditurePerCapita: 1975,  var_: -16.16,
    
        }, {
            country: "united kingdom", year: 2015, educationExpense: 73190.4, educationExpensePub: 13.91, educationExpensePib: 5.54, healthExpenditurePerCapita: 2028, var_: -10.36,
    
        }, {
            country: "portugal",  year: 2015, educationExpense: 133.4, educationExpensePub: 132.91, educationExpensePib: 52.54, healthExpenditurePerCapita: 228, var_: -10.36,
    
        }, {
            country: "belgium", year: 2016, educationExpense: 13313.4, educationExpensePub: 13.91, educationExpensePib: 5.54,  healthExpenditurePerCapita: 28, var_: -10.36,
    
        },{
    
            country: "austria", year: 2013, educationExpense: 461.5,  educationExpensePub: 9.77, educationExpensePib: 4.28, healthExpenditurePerCapita: 977, var_: -3.08,
    
        }, {
            country: "estonia", year: 2015, educationExpense: 16754.1, educationExpensePub: 10.98, educationExpensePib: 4.81, healthExpenditurePerCapita: 1975, var_: -16.16,
    
        }, {
            country: "thailand", year: 2016,  educationExpense: 3190.4, educationExpensePub: 3.91, educationExpensePib: 5.54, healthExpenditurePerCapita: 2028,var_: -1.36,
    
        }, {
            country: "slovenia", year: 2017, educationExpense: 233.4,  educationExpensePub: 32.91, educationExpensePib: 5.54, healthExpenditurePerCapita: 28, var_: -5.36,
    
        }, {
            country: "cyprus", year: 2015, educationExpense: 113.4, educationExpensePub: 3.91, educationExpensePib: 7.54, healthExpenditurePerCapita: 28, var_: -43.36,
    
        },{
    
            country: "spain", year: 2016, educationExpense: 6241.5, educationExpensePub: 19.77, educationExpensePib: 24.28, healthExpenditurePerCapita: 77, var_: -13.08,
    
        }, {
            country: "germany", year: 2016, educationExpense: 754.1, educationExpensePub: 20.98, educationExpensePib: 14.81, healthExpenditurePerCapita: 1975, var_: -6.16,
    
        }, {
            country: "united kingdom", year: 2015, educationExpense: 2130.4, educationExpensePub: 3.91, educationExpensePib: 4.54, healthExpenditurePerCapita: 28, var_: -16.36,
    
        }, {
            country: "portugal", year: 2017, educationExpense: 33.4, educationExpensePub: 13.91, educationExpensePib: 5.54, healthExpenditurePerCapita: 228,var_: -1.36,
    
        }, {
            country: "belgium", year: 2015, educationExpense: 133.4, educationExpensePub: 23.91, educationExpensePib: 7.54, healthExpenditurePerCapita: 28, var_: -2.36,
    
        }, {
            country: "china", year: 2015, educationExpense: 1433.4, educationExpensePub: 63.91, educationExpensePib: 3.54, healthExpenditurePerCapita: 668, var_: 9.36,
    
        }, {
            country: "china", year: 2016, educationExpense: 733.4, educationExpensePub: 5.91, educationExpensePib: 3.54, healthExpenditurePerCapita: 668, var_: -4.36,
    
        }, {
            country: "china", year: 2013, educationExpense: 833.4, educationExpensePub: 3.91, educationExpensePib: 2.54, healthExpenditurePerCapita: 968, var_: 2.36,
    
        }, {
            country: "china", year: 2014, educationExpense: 9436.4, educationExpensePub: 13.21, educationExpensePib: 3.54, healthExpenditurePerCapita: 668, var_: 5.36,
    
        }, {
            country: "germany", year: 2011, educationExpense: 555.1, educationExpensePub: 9.98, educationExpensePib: 14.81, healthExpenditurePerCapita: 875, var_: -6.16,
    
        }, {
            country: "germany", year: 2012, educationExpense: 67754.1, educationExpensePub: 20.98, educationExpensePib: 4.81, healthExpenditurePerCapita: 1975, var_: -0.16,
    
        }, {
            country: "germany", year: 2007, educationExpense: 9754.1, educationExpensePub: 27.98, educationExpensePib: 14.81, healthExpenditurePerCapita: 195, var_: -2.16,
    
        }, {
            country: "germany", year: 2008, educationExpense: 724.1, educationExpensePub: 20.98, educationExpensePib: 24.81, healthExpenditurePerCapita: 1975, var_: -3.16,
    
        }, {
            country: "russia", year: 2015, educationExpense: 123724.1, educationExpensePub: 9.98, educationExpensePib: 14.81, healthExpenditurePerCapita: 175, var_: 1.16,
    
        }];
    
       
    
        publicExpenditureEducations.find({}).toArray((err, pEE) => {
    
            if (err) {
    
                res.sendStatus(500);
    
            }
            else {
    
                if (pEE.length > 0) {
    
                    res.sendStatus(409);
    
                }
                else {
    
                    newPublicExpenditureEducations.forEach((i) => {
                     
                        publicExpenditureEducations.insert(i);
    
    
                    });
                    res.sendStatus(200);
                }
    
            }
    
        });
    
    
    
    });
    
    
    
    // --------------------------------------------   GET /api/v1/public-expenditure-educations -----------------------------------------------------
    
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
        
        if(req.query.educationExpense){
            
             queries.educationExpense = Number(req.query.educationExpense); 
        } 
            
        if(req.query.educationExpensePub){
            
             queries.educationExpensePub = Number(req.query.educationExpensePub);
        } 
        
        if(req.query.educationExpensePib){
            
             queries.educationExpensePib = Number(req.query.educationExpensePib);
        } 
        
        if(req.query.var_ ){
            
             queries.var_ = Number(req.query.var_);
        }
        
        if(req.query.healthExpenditurePerCapita){
            
             queries.healthExpenditurePerCapita = Number(req.query.healthExpenditurePerCapita);
        }
            
            
            
           
            
        
    
        
    
    
        //Paginación y Búsqueda
        if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(startY) && Number.isInteger(endY)) {
    
            publicExpenditureEducations.find({ "year": { $gte: startY, $lte: endY } }).skip(offset).limit(limit).toArray((err, publicExpenditureEducation) => {
    
                if (err) {
    
                    res.sendStatus(500);
    
                }
                else {
                    
                    if( publicExpenditureEducation.length  == 0 ){
                                    
                        res.sendStatus(404);
                                    
                    }else{
                
                        res.status(200).send(publicExpenditureEducation.map((c) => {
                            delete c._id;
                            return c;
                    
                        }));
                    }
    
                }
            });
    
            //Paginacón
        }
        else if (Number.isInteger(limit) && Number.isInteger(offset)) {
    
            publicExpenditureEducations.find({}).skip(offset).limit(limit).toArray((err, publicExpenditureEducation) => {
    
                if (err) {
    
                    res.sendStatus(500);
    
                }
                else {
    
                  
                
                        res.status(200).send(publicExpenditureEducation.map((c) => {
                            delete c._id;
                            return c;
                    
                        }));
                    
    
                }
            });
            //Búsqueda 
        }
        else if (Number.isInteger(startY) && Number.isInteger(endY)) {
    
            publicExpenditureEducations.find({ "year": { $gte: startY, $lte: endY } }).toArray((err, publicExpenditureEducation) => {
    
                if (err) {
    
                    res.sendStatus(500);
    
                }
                else {
    
                    if(publicExpenditureEducation.length  == 0 ){
                                    
                            res.sendStatus(404);
                                    
                    }else{
                
                            res.status(200).send(publicExpenditureEducation.map((c) => {
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
            
                        publicExpenditureEducations.find(queries).toArray((err, publicExpenditureEducation) => {
                
                            if (err) {
                
                                res.sendStatus(500);
                
                            }
                            else {
                                
                                if(publicExpenditureEducation.length ==0 ){
                                    
                                    res.sendStatus(404);
                                    
                                }else{
                
                                    res.status(200).send(publicExpenditureEducation.map((c) => {
                                        delete c._id;
                                        return c;
                    
                                    }));
                                }
                                
                
                            }
                        });
                        
                }else{
                    
                    
                    publicExpenditureEducations.find({}).toArray((err, publicExpenditureEducation) => {
                
                            if (err) {
                
                                res.sendStatus(500);
                
                            }
                            else {
                
                                res.status(200).send(publicExpenditureEducation.map((c) => {
                                    delete c._id;
                                    return c;
                    
                                  }));

                            }
                        });
                    
                    
                    
                }
    
        }
    
    
    });
    
    
    
    
    
    
    
    // --------------------------------------------   POST /api/v1/public-expenditure-educations-----------------------------------------------------
    
    app.post(BASE_PATH, (req, res) => {
    
        var data = {
            country: req.body.country,
            year: Number(req.body.year),
            educationExpense: Number(req.body.educationExpense),
            educationExpensePub: Number(req.body.educationExpensePub),
            educationExpensePib: Number(req.body.educationExpensePib),
            healthExpenditurePerCapita: Number(req.body.healthExpenditurePerCapita),
            var_: Number(req.body.var_)
        }
        
        
        if (data["country"] == ""|| !isNaN(data["country"]) || isNaN(data["year"]) || isNaN(data["educationExpense"]) ||
            isNaN(data["educationExpensePub"]) || isNaN(data["educationExpensePib"]) || 
            isNaN(data["healthExpenditurePerCapita"])|| isNaN(data["var_"]) ||
            !data.hasOwnProperty("country") || !data.hasOwnProperty("year") || !data.hasOwnProperty("educationExpense")
            || !data.hasOwnProperty("educationExpensePub") || !data.hasOwnProperty("educationExpensePib")
            || !data.hasOwnProperty("healthExpenditurePerCapita") || !data.hasOwnProperty("var_") || data["educationExpense"] == 0
             || data["educationExpensePub"] == 0 || data["educationExpensePib"] == 0 || data["healthExpenditurePerCapita"] == 0
              || data["var_"] == 0) {
                            
            res.sendStatus(400); // //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)
    
        }else{
    
            publicExpenditureEducations.find({ "country": data["country"],   "year": data["year"]}).toArray((err, newPEE) => {
        
                if (err) { //Error interno del servidor
        
                    res.sendStatus(500);
        
                }else {
                    // Si existe el pais, pues se comprueba si el pais y eño es el mismo
                    //si es el año y pais iguales pues se envia un 409
                    // sino pues se crea
                    
                    if(newPEE.length > 0){
                    

  
                            res.sendStatus(409);
            
                    
                   }else {
                        
        
                        publicExpenditureEducations.insert(data, (err, newPEE) => {
        
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

    
    // -------------------------------------------- DELETE /api/v1/public-expenditure-educations --------------------------------------------
    
    app.delete(BASE_PATH, (req, res) => {
    
        publicExpenditureEducations.remove({}, (err, publicExpenditureEducation) => {
    
            if (err) {
    
                res.sendStatus(500);
    
            }
            else {
    
                res.sendStatus(200);
    
            }
    
        });
    
    
    });
    
    
    //  -------------------------------------------- GET /api/v1/public-expenditure-educations/alemania  --------------------------------------------
    
    // country or year
    
    
    
    app.get( BASE_PATH + "/:param", (req, res) => {
        
        var data = Number(req.params.param);
        var queries;
        
        if(Number.isInteger(data)){
            
             queries = {year: Number(req.params.param)};
            
        }else{
            
             queries = {country: req.params.param};
            
        }
    
        
        
        publicExpenditureEducations.find(queries).toArray((err, publicExpenditureEducation) => {

            if (err) {
    
                res.sendStatus(500);
    
            }else {

                if (publicExpenditureEducation.length < 1 && Number.isInteger(data)) {
    
                    res.sendStatus(404);
    
                }else {
    
                    
     
                    if(publicExpenditureEducation.length==1 && Number.isInteger(data)){
                        
                        delete publicExpenditureEducation[0]._id;
                        res.status(200).send(publicExpenditureEducation[0]);
                                  
                                
                    }else{
                                
                        res.status(200).send(publicExpenditureEducation.map((c) => {
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
            year: parseInt(req.params.year)
            
        } 
        
        console.log(params);
    
        publicExpenditureEducations.find(params).toArray((err, pEE) => {
    
            if (err) {
    
                res.sendStatus(500);
    
            }
            else {
                
            
    
                if (pEE.length == 0) {
    
                    res.sendStatus(404);
    
                }
                else {
    
               
                    delete pEE[0]._id;
                    res.status(200).send(pEE[0]);
                                    
                
    
                }
            }
        });
    });
    
    
    
    
    //   --------------------------------------------PUT /api/v1/public-expenditure-educations/españa   --------------------------------------------
    
    app.put( BASE_PATH + "/:country/:year", (req, res) => {
    
        var params = {
            country: req.params.country,
            year: parseInt(req.params.year)
            
        } 
        
        var updateData ={
            country: req.body.country,
            year: Number(req.body.year),
            educationExpense: Number(req.body.educationExpense),
            educationExpensePub: Number(req.body.educationExpensePub),
            educationExpensePib: Number(req.body.educationExpensePib),
            healthExpenditurePerCapita: Number(req.body.healthExpenditurePerCapita),
            var_: Number(req.body.var_)
        };
    
        publicExpenditureEducations.find(params).toArray((err, findPublicExpenditureEducation) => {
    
            if (err) { //error interno del servidor
    
                res.sendStatus(500);
    
            }
            else {
    
                if (findPublicExpenditureEducation.length == 0) { //Miramos si existe el recurso
    
                    res.sendStatus(404);
    
                }
                else {
                    //Miramos si existe algún error (ej: solicitud malformada, sintaxis errónea, etc)
                    if (updateData["country"] != req.params.country || updateData["year"] != params["year"] || !isNaN(updateData["country"]) 
                        ||  isNaN(updateData["year"]) || isNaN(updateData["educationExpense"]) || isNaN(updateData["educationExpensePub"]) 
                        || isNaN(updateData["educationExpensePib"]) || isNaN(updateData["healthExpenditurePerCapita"])|| isNaN(updateData["var_"])||
                        !updateData.hasOwnProperty("country") || !updateData.hasOwnProperty("year") || !updateData.hasOwnProperty("educationExpense")
                        || !updateData.hasOwnProperty("educationExpensePub") || !updateData.hasOwnProperty("educationExpensePib")
                        || !updateData.hasOwnProperty("healthExpenditurePerCapita") || !updateData.hasOwnProperty("var_")
                        || updateData["educationExpense"] == "" || updateData["educationExpensePub"] == "" || updateData["educationExpensePib"] == "" 
                        || updateData["healthExpenditurePerCapita"] == "" || updateData["var_"] == "" ){
                            
                        
                        res.sendStatus(400);
    
                    }else {
                       
    
                        publicExpenditureEducations.update(params, updateData, (err, updatePEE) => {
    
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
    
    
    //  --------------------------------------------  DELETE /api/v1/public-expenditure-educations/espania   --------------------------------------------
    
    //country or year
    
    app.delete(BASE_PATH + "/:param", (req, res) => {
    
        var data = Number(req.params.param);
        var queries;
        
        if(Number.isInteger(data)){
            
             queries = {year: Number(req.params.param)};
            
        }else{
            
             queries = {country: req.params.param};
            
        }
    
    
        publicExpenditureEducations.find(queries).toArray((err, deletePublicExpenditureEducations) => {
    
            if (err) {
    
                res.status(500);
    
            }
            else {
    
                if (deletePublicExpenditureEducations.length < 1) {
    
                    res.sendStatus(404);
    
                }
                else {
    
                    publicExpenditureEducations.remove(queries);
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
    
    
        publicExpenditureEducations.find(params).toArray((err, deletePublicExpenditureEducations) => {
    
            if (err) {
    
                res.status(500);
    
            }
            else {
    
                if (deletePublicExpenditureEducations.length < 1) {
    
                    res.sendStatus(404);
    
                }
                else {
    
                    publicExpenditureEducations.remove(params);
                    res.sendStatus(200);
    
                }
            }
        });
    
    });
    
    
    //   --------------------------------------------Métodos erróneos  --------------------------------------------
    
    //   -------------------------------------------- PUT /api/v1/public-expenditure-educations (ERROR)   --------------------------------------------
    
    app.put( BASE_PATH , (req, res) => {
    
        res.sendStatus(405);
    
    });
    
    
    //   -------------------------------------------- POST /api/v1/public-expenditure-educations (ERROR)   --------------------------------------------
    
    app.post( BASE_PATH + "/:country/:year", (req, res) => {
    
        res.sendStatus(405);
    
    });
    
    
    //   -------------------------------------------- GET /api/v1/secute/public-expenditure-educations -------------------------------------------
    app.get("/api/v2/secure/public-expenditure-educations", (req, res) => {
    
        var user = req.headers.user;
        var pass = req.headers.pass;
    
        if (user == "jmcc" && pass == "jmcc") { // pasamanos por la cabecera el usuario y la contraseña
    
            publicExpenditureEducations.find({}).toArray((err, publicExpenditureEducation) => {
    
                if (err) {
    
                    res.sendStatus(500);
    
                }
                else {
    
                    res.send(publicExpenditureEducation.map((c) => {
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



//----------------------------------------------------------------------------

}