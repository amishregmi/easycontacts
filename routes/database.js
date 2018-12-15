// Retrieve
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var async = require('async');
var url = "mongodb://localhost:27017/contacts";
var geo = require('mapbox-geocoding');
var geo = require('mapbox-geocoding');
geo.setAccessToken('pk.eyJ1IjoiYW1pc2g1MDE3IiwiYSI6ImNqcGhubDZlbTB5aWszcW9iMzQ2cjRqazcifQ.ouQSIdcWKt5zV264M6wkPg');

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
//	database.collection('contacts').remove();
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

exports.updateonecontact= function(new_details, callback){
	console.log("");
	console.log("OPENED THE UPDATE FUNCTION IN DATABASE");
	console.log("");
	console.log("HERE ARE THE DETAILS OBSERVED IN UPDATE DATABASE PAGE");
	console.log("WORK NOW?");
//	new_details = JSON.stringify(new_details);
	//console.log("OBJECT ID IS" );
	console.log("The new details are ", new_details); //GOT ALL THE NEW DETAILS HERE.
	//console.log("ID IS", ObjectId(new_details["idz"]));
	//console.log("THE TYPE OF DATA IS: ", typeof(new_details));
	//var idtoupdate=new_details["req_id"];


	database.collection('contacts').updateOne({
		
		"_id": ObjectId(new_details[0])},
		
		{$set: {
			prefix: new_details[1],
			firstname: new_details[2],
			lastname: new_details[3],
			street: new_details[4],
			city: new_details[5],
			state: new_details[6],
			zip: new_details[7],
			phone: new_details[8],
			email: new_details[9],
			contactbyphone: new_details[10],
			contactbymail: new_details[11],
			contactbyemail: new_details[12],
			latitude: new_details[13],
			longitude: new_details[14]

		}}, function(err,result){
			if(err){
				console.log(err);
			}
			else {
				callback();
			}
		
	})	

};

exports.deleteonecontact = function(id_contacttodelete, callback){
	console.log("INSIDE DATABASE TO DELETE");
	console.log(id_contacttodelete);
	console.log(String(id_contacttodelete));
	database.collection('contacts').deleteOne({"_id": ObjectId(String(id_contacttodelete))}, function(err){
		if (err){
			throw err;
		}
		else {console.log("DELETEDDDD");
		}	
	});
	
};

exports.getAllContacts = function(){
	return contacts;
}

		