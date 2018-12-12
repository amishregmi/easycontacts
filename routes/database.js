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
	

	if (contact_details[4]==undefined){
		contact_details[4]='-';
	}

	if (contact_details[8]==undefined){
		contact_details[8]='-';
	}
	console.log("INSERTING PREFIX", contact_details[0]);
	//database.collection('contacts').remove();
	database.collection('contacts').insertOne({
////contact_details.push(prefix, firstname,lastname, street, city, state, zip, phone, email, contactbyphone, contactbymail, contactbyemail, latitude, longitude );


		prefix: contact_details[0],
		firstname : contact_details[1],
		lastname: contact_details[2],
		street: contact_details[3],
		city: contact_details[4],
		state:contact_details[5],
		zip:contact_details[6],
		phone: contact_details[7],
		email: contact_details[8],
		contactbyphone:contact_details[9],
		contactbymail: contact_details[10],
		contactbyemail: contact_details[11],
		latitude: contact_details[12],
		longitude: contact_details[13]
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

		