var express = require('express');
var router = express.Router();
var database = require('./database');
var objectID = require('mongodb').ObjectID;

router.get('/', function(req,res){
	database.getAllContacts().find().toArray(function(err,result){
		if(!err){

			console.log(result);
			res.render('contacts',{contacts:result});
		}
	});
});



module.exports=router;