const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const port = 3000;
require('dotenv').config();
const session = require('express-session');
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
var bcrypt = require("bcrypt");
var flash = require("connect-flash");
var methodOverride = require('method-override');

var routes = require('./routes/mailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


require('./routes/database').establishconnection();

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({secret: 'secure-contacts'}));
app.use(passport.initialize());
app.use(passport.session());



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

var username= "amish";
var password = "webapp";

bcrypt.genSalt(10, function(err,salt){
	bcrypt.hash(password, salt,function(err,hash){
		password=hash;
		console.log("Hashed password= ",password);
	});
});


passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },

    function(user, pswd, done) {
        if ( user != username ) {
            console.log("Username mismatch");
            return done(null, false);
        }

        bcrypt.compare(pswd, password, function(err, isMatch) {
            if (err) return done(err);
            if ( !isMatch ) {
                console.log("Password mismatch");
            }
            else {
                console.log("Valid credentials");
            }
            done(null, isMatch);
        });
      }
  ));

  passport.serializeUser(function(username, done) {
      // this is called when the user object associated with the session
      // needs to be turned into a string.  Since we are only storing the user
      // as a string - just return the username.
      done(null, username);
  });

  passport.deserializeUser(function(username, done) {
      // normally we would find the user in the database and
      // return an object representing the user (for example, an object
      // that also includes first and last name, email, etc)
      done(null, username);
   });


// Posts to login will have username/password form data.
// passport will call the appropriate functions...
routes.post('/login',
    passport.authenticate('local', { successRedirect: '/contacts',
                                     failureRedirect: '/login_fail',
                                  })
);

routes.get('/login', function (req, res) {
  res.render('login', {});
});

routes.get('/login_fail', function (req, res) {
  res.render('login_fail', {});
});

routes.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});



module.exports=router;
server = http.Server(app);

server.listen(port);

