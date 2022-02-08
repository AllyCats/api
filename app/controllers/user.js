'use strict';
const MicroService = require("../microservices/micro-service");

exports.getUser = async function(req, res) {
	let uuid = req.params.uuid;

	if(!uuid){
		return res.status(500).json({message: "Invalid request, missing user's uuid"});
	}

	let params = {
		limit: 1,
		uuid: uuid
	}

	let users = await MicroService.getUsers(params).catch((error) => {
		console.error(error);
		res.status(500).json(error);
	});

	if(users){
		if(users.length){
			res.json(users[0]);
		}else{
			res.status(404).json({message: "User not found"})
		}
		
	}
	
}