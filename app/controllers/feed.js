'use strict';
const MicroService = require("../microservices/micro-service");

exports.getFeed = async function(req, res) {
	let limit = req.query.limit ? req.query.limit : 25;
	let page = req.query.page ? req.query.page : 1;

	let params = {
		limit: limit,
		page: page
	}
	let feed = await MicroService.getFeed(params).catch((error) => {
		console.error(error);
		res.status(500).json(error);
	});

	if(feed){
		res.status(feed.status).json(feed);
	}
	
}