"use strict"

var User = require('../../models/user');

module.exports = {
	signupUser:function(req,res){
		console.log('inside')
		 var user = User(req.body);    
		 user.save().then(function(result){
             return res.json({status:200,result:result})
		 }).catch(function(err){
		 	return res.json({status:400,reason:err.message})
		 })
	}
}