const logger = require('./logging.js')

module.exports = (err, req, res, next) => {
	logger.log({
		level: 'error',
		message: err.message,
		meta: err
	})
	res.status(500).send('Something Failed.')
}
