const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const port = 3000;
require('dotenv').config();
const ex_session = require('express-session');
const dateformat = require('dateformat');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/cmps369';
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var ObjectId = require('mongodb').ObjectID;
var lessMiddleware = require('less-middleware');
var db = require('./routes/database.js');


require('./routes/database').establishconnection();

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(ex_session({secret: 'secure-contacts'}));


app.use("/", require("./routes/mailer.js"));
app.use("/mailer", require("./routes/mailer.js"));
app.use("/contacts", require("./routes/contacts.js"));

app.post("/endpoint", function(req,res){

	const givenidtodelete = req.body.deletethisid;
	console.log("THIS IS THE ID RECEIVED IN MAIN APP: ",givenidtodelete);

	db.deleteonecontact(givenidtodelete, function(err,resp){
		if (err){
			console.log("ERROR GOING TO DB TO DELETE");
		}

		console.log("DELETED");
		//res.send(req.body);
	});


	
});

module.exports=router;
server = http.Server(app);

server.listen(port);

