var express = require("express");
var router = express.Router();
var database = require('./database');
var NodeGeocoder = require('node-geocoder');

var options = {
	provider: 'google',

  // Optional depending on the providers
	httpAdapter: 'https', // Default
	apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
	formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);


var objectID = require('mongodb').ObjectID;

router.get("/", function(req,res){
	res.render("mailer",{});
});

router.get("/mailer", function(req,res){
	res.render("mailer",{});
});

router.post("/posted", function(req,res){
	var contact_details = [];
	var posteddata = req.body;
	var prefix = posteddata.prefix;
	var firstname = posteddata.firstname; 
	var lastname = posteddata.lastname;
	var street = posteddata.street;
	//city, ZIP, phone, email, 
	var city = posteddata.city;
	var zip = posteddata.ZIP;
	var phone  = posteddata.phone;
	var email = posteddata.email;
	var state = posteddata.state;
	var contactbyphone="No";
	var contactbyemail="No";
	var contactbymail="No";

	var check_phone = posteddata.phonechk;
	var check_mail = posteddata.mailchk;
	var check_email = posteddata.emailchk;
	var check_all = posteddata.anychk;
	console.log(check_phone);
	console.log("FORM VALUES: ");
	console.log(firstname, lastname, street, city, state, zip , phone, email, check_phone, check_email, check_mail, check_all);

	
	if (check_all!=undefined){
		contactbyphone="Yes";
		contactbyemail="Yes";
		contactbymail="Yes";
	}
	if (check_phone!=undefined){
		contactbyphone="Yes";
	}
	if (check_mail!=undefined){
		contactbymail="Yes";
	}
	if (check_email!=undefined){
		contactbyemail="Yes";
	}

	console.log(contactbyphone, contactbyemail, contactbymail);
	var fulladdress=  street+", "+city+", "+state+" "+zip;

	var latitude;
	var longitude;



	//fullname = firstname+" "+lastname;
	//Prefix, first name, last name, street, city, state, zip, phone, email, contact
	contact_details.push(firstname,lastname, fulladdress, phone, email, contactbyphone, contactbymail, contactbyemail );

	
	database.addaContact(contact_details, function(err,resp){
		if (err){
			console.log(err);
			return;
		}
		console.log("HERE BEING RENDERED")
		//clconsole.log(res);
		res.render("submitted",{name:contact_details});
	});


})

module.exports=router;