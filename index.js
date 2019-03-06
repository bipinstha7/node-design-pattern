const express = require('express')
const mongoose = require('mongoose')

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movie = require('./routes/movie')
const rentals = require('./routes/rentals')

const app = express()

mongoose
	.connect('mongodb://design:design1@ds361085.mlab.com:61085/node-design-pattern', {
		useNewUrlParser: true
	})
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movie', movie)
app.use('/api/rentals', rentals)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
