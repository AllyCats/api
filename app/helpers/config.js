const http = require('http');
const https = require('https');
const config = {
	jwt: {
		secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "SuperSecretKey"
	},
	protocol: process.env.IS_PROD ? https : http,
	microServices: [
		{
			name: 'users',
			host: 'localhost',
			path: '/users',
			port: '8081'
		},
		{
			name: 'feed',
			host: 'localhost',
			path: '/feed',
			port: '8082'
		},
		{
			name: 'events',
			host: 'localhost',
			path: '/events',
			port: '8083'
		}
	]
}
module.exports = config;