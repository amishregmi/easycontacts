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



module.exports=router;
server = http.Server(app);

server.listen(port);

