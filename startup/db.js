const mongoose = require('mongoose')
const logger = require('../middleware/logging')
const keys = require('../config/keys')

module.exports = () => {
	mongoose
		.connect(keys.mongoURI, { useNewUrlParser: true })
        .then(() => logger.info('Connected to MongoDB...'))

        /* the catch block error will be caught by winston exception.handle method */
		// .catch(err => logger.error('Could not connect to MongoDB...'))
}
