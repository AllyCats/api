'use strict';
module.exports = function(app) {
	const authController = require('./controllers/auth');
	const feedController = require('./controllers/feed');
	const userController = require('./controllers/user');
	const eventController = require('./controllers/event');

	app.route('/login')
    .get(authController.getAuthToken);

	app.route('/login')
    .post(authController.getAccessToken);
	
	app.route('/feed')
    .get(feedController.getFeed);

	app.route('/users/:uuid')
    .get(userController.getUser);

	app.route('/events')
    .get(eventController.getEvents);
}