'use strict';
const config = require('./config');
const jwt = require('jsonwebtoken');

class msToken {
	static getToken(params) {
		const data = {
			service: {
				id: 1
			},
			params: params
		};

		const token = jwt.sign({
			data: data
		}, config.jwt.secret);

		return token;
	}
}

module.exports = msToken;