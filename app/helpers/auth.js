const config  = require('./config');
const jwt			= require('jsonwebtoken');

module.exports = Auth;

async function Auth(req, res, next) {
    // make authenticate path public
    if (
			req.path === '/login') {
			return next();
    }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
			return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify token
    const base64Credentials =  req.headers.authorization.split(' ')[1];

    try{
			var decoded = jwt.verify(base64Credentials, config.jwt.secret);
    }catch(err){
			return res.status(401).json(err);
    }

    //Requires valid ip address and user id
    const user  = decoded.user
		const service  = decoded.service

    if(!user && !service){//Must be a user or service requesting access
			return res.status(401).json({ message: 'Invalid token - token malformed' });
    }
    
    if(decoded.exp < Math.floor(Date.now() / 1000)){//limits sharing tokens
			return res.status(401).json({ message: 'Access token has expired' });
    }

    //Here we can append additional data to the request...

    next();
}