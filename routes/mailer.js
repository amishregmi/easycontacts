var express = require("express");
var router = express.Router();
var database = require('./database');

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
	var firstname = posteddata.firstname; 
	var lastname = posteddata.lastname;
	var street = posteddata.street;
	//city, ZIP, phone, email, 
	var city = posteddata.city;
	var zip = posteddata.ZIP;
	var phone  = posteddata.phone;
	var email = posteddata.email;
	var state = posteddata.state;
	var contactbyphone=false;
	var contactbyemail=false;
	var contactbymail=false;

	var check_phone = posteddata.phonechk;
	var check_mail = posteddata.mailchk;
	var check_email = posteddata.emailchk;
	var check_all = posteddata.any;
	console.log(check_phone);

	console.log(check_all);
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