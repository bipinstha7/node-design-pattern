const express = require('express')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
require('express-async-errors') // handles async operation with try-catch block without explicitely using try-catch block

const app = express()

require('./startup/routes')(app)
require('./startup/db')()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
