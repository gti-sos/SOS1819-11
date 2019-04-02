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


var generalPublicExpensesAPI = require("./generalPublicExpenesesAPI/index.js");
var generalPublicExpenses;

clientAJSM.connect(err => {
    generalPublicExpenses = clientAJSM.db("sos1819").collection("general-public-expenses");
    generalPublicExpensesAPI.register(app, generalPublicExpenses);
    
    console.log("Connected! server general-public-expenses");
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

//----------------------------------------------------------------------------


app.listen(port, () => {

    console.log("Super server ready on port " + port);
});
