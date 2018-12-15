var express = require('express');
var router = express.Router();
var database = require('./database');
var objectID = require('mongodb').ObjectID;
var geo = require('mapbox-geocoding');
geo.setAccessToken('pk.eyJ1IjoiYW1pc2g1MDE3IiwiYSI6ImNqcGhubDZlbTB5aWszcW9iMzQ2cjRqazcifQ.ouQSIdcWKt5zV264M6wkPg');


router.get('/', function(req,res){
	database.getAllContacts().find().toArray(function(err,result){
		if(!err){
			//console.log("SENDING JSON CONTACTS: ");
			//console.log(result);
			res.render('contacts', {contacts: result});
		}
	});
});


module.exports=router;