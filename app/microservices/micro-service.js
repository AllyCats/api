'use strict';
const config = require('../helpers/config');
const msToken = require("../helpers/ms-token");

class MicroService {
	static async getUsers(params){
		return await doRequest(setOptions('users', params));
	}

	static async getFeed(params){
		return await doRequest(setOptions('feed', params));
	}

	static async getEvents(params){
		return await doRequest(setOptions('events', params));
	}
}

function setOptions(serviceName, params){
	let service = config.microServices.find(service => service.name === serviceName);
		return {
			host: service.host,
			path: service.path,
			port: service.port,
			headers: {"Authorization": 'Bearer ' + msToken.getToken(params)}
		};
}

async function doRequest(options){
	return new Promise((resolve, reject) => {
		let callback = function(res) {
			let data = ''
			res.on('data', function (chunk) {
				data += chunk;
			});

			res.on('end', function () {
				data = JSON.parse(data)
				data.status = res.statusCode;
				resolve(data);
			});
		}

		let req = config.protocol.request(options, callback);
		req.end();
	});
}

module.exports = MicroService;