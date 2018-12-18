var express = require("express");
var geo = require('mapbox-geocoding');
var router = express.Router();
var database = require('./database');
var geo = require('mapbox-geocoding');

geo.setAccessToken('pk.eyJ1IjoiYW1pc2g1MDE3IiwiYSI6ImNqcGhubDZlbTB5aWszcW9iMzQ2cjRqazcifQ.ouQSIdcWKt5zV264M6wkPg');

var objectID = require('mongodb').ObjectID;

router.get("/", function(req,res){
	res.render("mailer",{});
});

router.get("/mailer", function(req,res){
	res.render("mailer",{});
});


var ensureLoggedIn = function(req, res, next) {
	if ( req.user ) {
		next();
	}
	else {
		res.redirect("/login");
	}
}

router.post("/posted", function(req,res){
	var contact_details = [];
	var posteddata = req.body;
	var prefix = posteddata.prefix;
	console.log("PREFIX");
	console.log(prefix);
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
	//console.log(check_phone);
	//console.log("FORM VALUES: ");
		//fullname = firstname+" "+lastname;
	//Prefix, first name, last name, street, city, state, zip, phone, email, contact
	

	//console.log(firstname, lastname, street, city, state, zip , phone, email, check_phone, check_email, check_mail, check_all);

	
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

	//console.log(contactbyphone, contactbyemail, contactbymail);
	var fulladdress=  street+", "+city+", "+state+" "+zip;

	var latitude;
	var longitude;

	geo.geocode('mapbox.places', fulladdress, function (err, geoInfo) {
    	console.log("DATA FROM GEOCODING");
    	//console.log(geoInfo);
    	longitude = geoInfo.features[0].center[0];
        latitude = geoInfo.features[0].center[1];

       // console.log("The longitude is", longitude);
        //console.log("The latitude is: ",latitude);
    //	console.log("PUSHING INFO");
		contact_details.push(prefix, firstname,lastname, street, city, state, zip, phone, email, contactbyphone, contactbymail, contactbyemail, latitude, longitude );

	
		database.addaContact(contact_details, function(err,resp){
			if (err){
				console.log(err);
				return;
			}
			//console.log("HERE BEING RENDERED")
		//clconsole.log(res);
			res.render("submitted",{name:contact_details});
		});


	});


 });


router.post("/updatecontact", ensureLoggedIn, function(req,res){


	console.log("UPDATE CONTACTS POST REQUEST RECEIVED IN SERVER");
	var contact_details_update = [];
	var posteddata = req.body;
	var req_id = req.body.togetid;
	
	var prefix = posteddata.prefix;
	console.log("PREFIX");
	console.log(prefix);
	
	var firstname = posteddata.firstname; 
	var lastname = posteddata.lastname;
	var street = posteddata.street;

	console.log("INSIDE SERVER");
	console.log("STREET IS ", street);

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

	//console.log(contactbyphone, contactbyemail, contactbymail);
	var fulladdress=  street+", "+city+", "+state+" "+zip;
	console.log("FULL ADDRESS IS: ", fulladdress);
	var latitude;
	var longitude;

	geo.geocode('mapbox.places', fulladdress, function(err, geoInfo) {
    	console.log("DATA FROM GEOCODING");
    	console.log(geoInfo);
    	console.log("GEO FEATURES");
    	//console.log(geoInfo.features[0]);
    	longitude = geoInfo.features[0].center[0];
        latitude = geoInfo.features[0].center[1];

       //console.log("The longitude is", longitude);
       // console.log("The latitude is: ",latitude);
    //	console.log("PUSHING INFO");
		contact_details_update.push(req_id, prefix, firstname,lastname, street, city, state, zip, phone, email, contactbyphone, contactbymail, contactbyemail, latitude, longitude );

	
		database.updateonecontact(contact_details_update, function(err,resp){
			if (err){
				console.log(err);
				return;
			}
			else {
				console.log("RESPONSE IS,", resp);
			 console.log("HERE BEING RENDERED")
		//clconsole.log(res);
		database.getAllContacts().find().toArray(function(err,result){
				if (err){

					console.log("DISPLAY PAGE AFTER UPDATE");
					throw err;
				}
				
					console.log("RENDERING NOW");
					console.log(result);
					res.render('contacts',{contacts:result});
				
			})
		}
		});


	});


 });










module.exports=router;