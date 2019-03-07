const logger = require('./logging.js/index.js')

module.exports = (err, req, res, next) => {
	logger.log({
		level: 'error',
		message: err.message,
		error: err
	})
	res.status(500).send('Something Failed.')
}
