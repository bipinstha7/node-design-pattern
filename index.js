const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
require('express-async-errors') // handles async operation with try-catch block without explicitely using try-catch block

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movie = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const keys = require('./config/keys')
const error = require('./middleware/error')

const app = express()

mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movie', movie)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
