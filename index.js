const express = require('express')
require('express-async-errors') // handles async operation with try-catch block without explicitely using try-catch block

const app = express()

require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validation')

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
