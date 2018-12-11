// Retrieve
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var async = require('async');
var url = "mongodb://localhost:27017/contacts";

var contacts; //Collection Name
var contactsList; //Array of current contacts

exports.establishconnection = function(){
	MongoClient.connect(url,function(err,db){
		if(err){
			console.log(err);
			return;
		}
		console.log("Connected to db Server");

		database = db.db("cmps");

		database.createCollection('contacts', function(err,res){
			if (err){
				console.log(err);
				return;
			}
			else {
				console.log("Contacts collection has been created");
				contacts = database.collection('contacts');
			}
		});
	});
	
}



exports.addaContact = function(contact_details, callback){
//	console.log("This is callback: ", callback);
//	console.log("Contact_details: ",contact_details);
	

	if (contact_details[3]==undefined){
		contact_details[3]='-';
	}

	if (contact_details[7]==undefined){
		contact_details[7]='-';
	}
	
	//database.collection('contacts').remove();
	database.collection('contacts').insertOne({
		
		fullname : contact_details[0]+" "+contact_details[1],
		address: contact_details[2],
		phonenumber : contact_details[3],
		email: contact_details[4],
		contactbyphone: contact_details[5],
		contactbymail: contact_details[6],
		contactbyemail: contact_details[7],
		latitude: contact_details[8],
		longitude: contact_details[9]

	}, function(err, result){
		if (err){
			console.log(err);
		}
		else {
//			console.log("RECORD SUCCESSFULLY ADDED");
			callback();
		}

	})
};

exports.getAllContacts = function(){
	return contacts;
}

		