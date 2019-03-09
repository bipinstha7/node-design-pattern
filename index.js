const express = require('express')
require('express-async-errors') // handles async operation with try-catch block without explicitely using try-catch block

const app = express()

const logger = require('./middleware/logging')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validation')
require('./startup/prod')(app)

const port = process.env.PORT || 3000
app.listen(port, () => logger.info(`Listening on port ${port}...`))
