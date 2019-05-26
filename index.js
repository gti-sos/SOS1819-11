var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const MongoClient = require('mongodb').MongoClient;
var cors = require("cors");
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname + "/public")));


app.use(cors());

// --------------------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------API REST Antonio J----------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------> Mini-Postman Antonio Jesús

app.use('/general-public-expenses', express.static(path.join(__dirname, "public/general-public-expenses/views"))); // Redirige a esa ruta cuando haces un get a general-public-expense

//------------------------------
//----------------------------> UI Front-end Antonio Jesús

app.use('/ui/v1/general-public-expenses', express.static(path.join(__dirname, "public/general-public-expenses-app/views"))); // Redirige a esa ruta cuando haces un get a general-public-expense

//------------------------------

//Conexión a base de datos Mongodb
const uriAJSM = "mongodb+srv://test:test@sos-project-enqlt.mongodb.net/test?retryWrites=true";
const clientAJSM = new MongoClient(uriAJSM, { useNewUrlParser: true });

//Ejecuta el archivo index.js individual para la conexion
var generalPublicExpensesAPI = require("./generalPublicExpensesAPI/index.js");
var generalPublicExpenses;

//Conexion con el server
clientAJSM.connect(err => {
    generalPublicExpenses = clientAJSM.db("sos1819").collection("general-public-expenses");
    generalPublicExpensesAPI.register(app, generalPublicExpenses);

    console.log("Connected! server general-public-expenses");
});

//-----------------------------------------------------------------------

// -------------------API REST Juan Manuel Centeno-----------------------

//---------------------------------------Minipostman Juan Manuel Centeno -------------------------------------------




const uriJMCC = "mongodb+srv://test:test@sos-idqtq.mongodb.net/test?retryWrites=true";
const clientJMCC = new MongoClient(uriJMCC, { useNewUrlParser: true });

var publicExpenditureEducationsAPI = require("./publicExpenditureEducationsAPI/publicExpenditureEducationsV2.js");
var publicExpenditureEducations;

clientJMCC.connect(err => {
    publicExpenditureEducations = clientJMCC.db("sos1819").collection("public-expenditure-educations");

    publicExpenditureEducationsAPI.register(app, publicExpenditureEducations);
    console.log("Connected!");
});

//---------------------------------------------------------------------------


// -------------------API REST Joaquín Morillo Capitán------------------------

app.use("/ui/v1/public-health-expenses", express.static(path.join(__dirname, "public/public-health-expenses/views")));
// const MongoClient = require("mongodb").MongoClient;
const uriJMC = "mongodb+srv://test:test@sos-xfza6.mongodb.net/test?retryWrites=true";
const clientJMC = new MongoClient(uriJMC, { useNewUrlParser: true });

var api = require("./public-health-expenses-api");
var publicHealthExpenses;

clientJMC.connect(error => {
    publicHealthExpenses = clientJMC.db("SOS1819").collection("public-health-expenses");
    console.log("Connected with public-health-expenses!");
    api.register(app, publicHealthExpenses);
    console.log("Connected!");
});

//----------------------------------------------------------------------------

app.listen(port, () => {

    console.log("Super server ready on port " + port);
});
