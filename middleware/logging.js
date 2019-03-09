const { createLogger, format, transports } = require('winston')
const { combine, timestamp, prettyPrint } = format
require('winston-mongodb')

const keys = require('../config/keys')

const logger = createLogger({
	format: combine(timestamp(), prettyPrint()),
	transports: [new transports.Console(), new transports.File({ filename: 'logger.log', level: 'error' })]
})

// process.on('uncaughtException', ex => {
// 	logger.log({
// 		level: 'error',
// 		message: ex.message,
// 		meta: ex
// 	})
// 	process.exit(1)
// })

/* It'll catch both uncaughtException and unhandledRejection */
logger.exceptions.handle(
	new transports.File({ filename: 'exceptions.log' })
  )

process.on('unhandledRejection', ex => {
	// logger.log({
	// 	level: 'error',
	// 	message: ex.message,
	// 	meta: ex
	// })
	// process.exit(1)

	/* throw exception and it'll be caught by logger.exception.handle */
	throw ex
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
