const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
require('express-async-errors') // handles async operation with try-catch block without explicitely using try-catch block

const keys = require('./config/keys')

const app = express()

require('./startup/routes')(app)

mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...'))



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
