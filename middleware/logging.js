const { createLogger, format, transports } = require('winston')
const { combine, timestamp, prettyPrint } = format
require('winston-mongodb')

const keys = require('../config/keys')

const logger = createLogger({
	format: combine(timestamp(), prettyPrint()),
	transports: [new transports.Console(), new transports.File({ filename: 'logger.log', level: 'error' })]
})

logger.add(
	new transports.MongoDB({
		db: keys.mongoURI,
		// collection: 'logs',
		// level: 'error',
		// format: format.simple(),
		// label: false
	})
)

module.exports = logger
