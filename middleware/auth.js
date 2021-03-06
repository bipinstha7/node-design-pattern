const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

function auth(req, res, next) {
	if (!keys.requiresAuth) return next();

	const token = req.header('x-auth-token')
	if (!token) return res.status(401).send('Access denied. No token provided.')

	try {
		const decoded = jwt.verify(token, keys.jwtPrivateKey)
        req.user = decoded
        next()
	} catch (error) {
		res.status(400).send('Invalid Token.')
	}
}

module.exports = auth
