'use strict';
const config = require("../helpers/config");
const jwt = require('jsonwebtoken');
const MicroService = require("../microservices/micro-service");

exports.getAuthToken = function(req, res) {
	const expires = 300; //5 mins
	let token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + expires,
	}, config.jwt.secret);

	const authToken = {
		authToken: token,
		expires: expires
	}

	res.json(authToken);
}

exports.getAccessToken = async function(req, res) {
	try{
		// check for basic auth header
	if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
		return res.status(401).json({ message: 'Missing Authorization Header' });
	}

	// verify token
	const base64Credentials =  req.headers.authorization.split(' ')[1];

		var decoded = jwt.verify(base64Credentials, config.jwt.secret);
	}catch(err){
		return res.status(401).json(err);
	}

	if(decoded.exp < Math.floor(Date.now() / 1000)){//limits sharing tokens
		return res.status(401).json({ message: 'Access token has expired' });
	}

	//Here we can append additional data to the request...
	const email = req.body.email;
	const password = req.body.password;//Will hash eventually

	if(!email){
		return res.status(500).json({message: "Missing required parameter: email"});
	}

	if(!password){
		return res.status(500).json({message: "Missing required parameter: password"});
	}

	const params = {
		email: email,
		password: password,
		limit: 1
	}

	let users = await MicroService.getUsers(params).catch((error) => {
		console.error(error);
		res.status(500).json(error);
	});

	if(users){
		if(users.length == 1){
			const expires = 3600; //1 hour
			const token = jwt.sign({
				exp: Math.floor(Date.now() / 1000) + expires,
				user: users[0]
			}, config.jwt.secret);

			const acessToken = {
				accessToken: token,
				expires: expires
			}

			res.json(acessToken);
		}else{
			res.status(401).json({message: "Invalid email or password"});
		}
	}
}